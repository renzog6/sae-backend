// filepath: sae-backend/src/modules/companies/business-categories/business-categories.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { CreateBusinessCategoryDto } from "./dto/create-business-category.dto";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";

@Injectable()
export class BusinessCategoriesService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.businessCategory;
  }

  protected buildSearchConditions(q: string) {
    return [
      { name: { contains: q, mode: "insensitive" } },
      { code: { contains: q, mode: "insensitive" } },
      { information: { contains: q, mode: "insensitive" } },
    ];
  }

  async create(createDto: CreateBusinessCategoryDto) {
    const { name, code, information } = createDto;
    const category = await this.prisma.businessCategory.create({
      data: {
        name,
        code,
        information,
      },
    });
    return { data: category };
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    // For compatibility with client-side filtering, get all business categories (no pagination)
    // This matches the pattern used in other modules like equipment
    const q = query.q;

    // Build search conditions
    const where: any = {
      deletedAt: null, // Only return non-deleted business categories
    };

    if (q) {
      where.OR = this.buildSearchConditions(q);
    }

    // Get all business categories without pagination for client-side filtering
    const categories = await this.prisma.businessCategory.findMany({
      where,
      include: { subCategories: true },
      orderBy: {
        name: "asc", // Always sort by name ascending
      },
    });

    // Return in a compatible format
    return new BaseResponseDto(
      categories,
      categories.length,
      1,
      categories.length
    );
  }

  async remove(id: number): Promise<{ message: string }> {
    // Soft delete: set both isActive to false and deletedAt
    // Ensure category exists
    await this.findOne(id);
    await this.prisma.businessCategory.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });
    return { message: "Business category deleted successfully" };
  }

  async restore(id: number) {
    // Restore: set isActive to true and clear deletedAt
    // Ensure category exists (even if deleted)
    const category = await this.prisma.businessCategory.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Business category with id ${id} not found`);
    }

    const restoredCategory = await this.prisma.businessCategory.update({
      where: { id },
      data: {
        isActive: true,
        deletedAt: null,
      },
    });
    return { data: restoredCategory };
  }
}
