// filepath: sae-backend/src/modules/equipment/services/equipment-category.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { CreateEquipmentCategoryDto } from "../dto/create-equipment-category.dto";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";

@Injectable()
export class EquipmentCategoryService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.equipmentCategory;
  }

  protected buildSearchConditions(q: string) {
    return [{ name: { contains: q } }, { description: { contains: q } }];
  }

  async create(createEquipmentCategoryDto: CreateEquipmentCategoryDto) {
    const category = await this.prisma.equipmentCategory.create({
      data: createEquipmentCategoryDto,
      include: { types: true },
    });
    return { data: category };
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q, sortBy = "name", sortOrder = "asc" } = query;

    // Build search filter
    const where: any = {};
    if (q) {
      where.OR = [{ name: { contains: q } }, { description: { contains: q } }];
    }

    // Execute query with transaction
    const [data, total] = await this.prisma.$transaction([
      this.prisma.equipmentCategory.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
        include: { types: true },
      }),
      this.prisma.equipmentCategory.count({ where }),
    ]);

    return new BaseResponseDto(data, total, query.page || 1, query.limit || 10);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.equipmentCategory.delete({ where: { id } });
    return { message: "Equipment category deleted successfully" };
  }
}
