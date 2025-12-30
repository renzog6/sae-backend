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
      { name: { contains: q } },
      { code: { contains: q } },
      { information: { contains: q } },
    ];
  }

  protected override getDefaultOrderBy() {
    return { name: "asc" };
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    // Extract search query
    const q = query.q;

    // Build search conditions
    const where: any = {
      deletedAt: null, // Only return non-deleted brands
    };

    if (q) {
      where.OR = this.buildSearchConditions(q);
    }

    return super.findAll(query, where);
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
