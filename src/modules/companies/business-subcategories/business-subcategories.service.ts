// filepath: sae-backend/src/modules/companies/business-subcategories/business-subcategories.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { CreateBusinessSubCategoryDto } from "./dto/create-business-subcategory.dto";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";

@Injectable()
export class BusinessSubcategoriesService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.businessSubCategory;
  }

  protected buildSearchConditions(q: string) {
    return [
      { name: { contains: q } },
      { description: { contains: q } },
      { businessCategory: { name: { contains: q } } },
    ];
  }

  async create(createBusinessSubCategoryDto: CreateBusinessSubCategoryDto) {
    const { name, description, businessCategoryId } =
      createBusinessSubCategoryDto;
    const subcategory = await this.prisma.businessSubCategory.create({
      data: {
        name,
        description,
        businessCategoryId,
      },
    });
    return { data: subcategory };
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    // For compatibility with client-side filtering, get all subcategories (no pagination)
    // This matches the pattern used in other modules like equipment
    const q = query.q;

    // Build search conditions
    const where: any = {
      deletedAt: null, // Only return non-deleted subcategories
    };

    if (q) {
      where.OR = this.buildSearchConditions(q);
    }

    // Get all subcategories without pagination for client-side filtering
    const subcategories = await this.prisma.businessSubCategory.findMany({
      where,
      include: {
        businessCategory: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: {
        name: "asc", // Always sort by name ascending
      },
    });

    // Return in a compatible format
    return new BaseResponseDto(
      subcategories,
      subcategories.length,
      1,
      subcategories.length
    );
  }

  async remove(id: number): Promise<{ message: string }> {
    // Soft delete: set both isActive to false and deletedAt
    // Ensure subcategory exists
    await this.findOne(id);
    await this.prisma.businessSubCategory.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });
    return { message: "Business subcategory deleted successfully" };
  }

  async restore(id: number) {
    // Restore: set isActive to true and clear deletedAt
    // Ensure subcategory exists (even if deleted)
    const subcategory = await this.prisma.businessSubCategory.findUnique({
      where: { id },
    });
    if (!subcategory) {
      throw new NotFoundException(
        `BusinessSubCategory with id ${id} not found`
      );
    }

    const restoredSubcategory = await this.prisma.businessSubCategory.update({
      where: { id },
      data: {
        isActive: true,
        deletedAt: null,
      },
    });
    return { data: restoredSubcategory };
  }
}
