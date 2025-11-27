// filepath: sae-backend/src/modules/equipment/services/equipment-type.services.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { CreateEquipmentTypeDto } from "../dto/create-equipment-type.dto";
import { UpdateEquipmentTypeDto } from "../dto/update-equipment-type.dto";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";

@Injectable()
export class EquipmentTypeService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.equipmentType;
  }

  protected buildSearchConditions(q: string) {
    return [
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }

  async create(createEquipmentTypeDto: CreateEquipmentTypeDto) {
    const type = await this.prisma.equipmentType.create({
      data: createEquipmentTypeDto,
      include: { category: true },
    });
    return { data: type };
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q, sortBy = "name", sortOrder = "asc" } = query;

    // Build search filter
    const where: any = {};
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    // Execute query with transaction
    const [data, total] = await this.prisma.$transaction([
      this.prisma.equipmentType.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
        include: { category: true },
      }),
      this.prisma.equipmentType.count({ where }),
    ]);

    return new BaseResponseDto(data, total, query.page || 1, query.limit || 10);
  }

  async findByCategory(categoryId: number) {
    return this.prisma.equipmentType.findMany({
      where: { categoryId },
      include: { category: true },
    });
  }
}
