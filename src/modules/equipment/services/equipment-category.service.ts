// filepath: sae-backend/src/modules/equipment/services/equipment-category.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateEquipmentCategoryDto } from "../dto/create-equipment-category.dto";
import { UpdateEquipmentCategoryDto } from "../dto/update-equipment-category.dto";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";

@Injectable()
export class EquipmentCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createEquipmentCategoryDto: CreateEquipmentCategoryDto) {
    return this.prisma.equipmentCategory.create({
      data: createEquipmentCategoryDto,
      include: { types: true },
    });
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

  async findOne(id: number) {
    const category = await this.prisma.equipmentCategory.findUnique({
      where: { id },
      include: { types: true },
    });
    if (!category)
      throw new NotFoundException(`Equipment category with ID ${id} not found`);
    return category;
  }

  async update(
    id: number,
    updateEquipmentCategoryDto: UpdateEquipmentCategoryDto
  ) {
    await this.findOne(id);
    return this.prisma.equipmentCategory.update({
      where: { id },
      data: updateEquipmentCategoryDto,
      include: { types: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.equipmentCategory.delete({ where: { id } });
  }
}
