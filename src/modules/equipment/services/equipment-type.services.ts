// filepath: sae-backend/src/modules/equipment/services/equipment-type.services.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateEquipmentTypeDto } from "../dto/create-equipment-type.dto";
import { UpdateEquipmentTypeDto } from "../dto/update-equipment-type.dto";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";

@Injectable()
export class EquipmentTypeService {
  constructor(private prisma: PrismaService) {}

  async create(createEquipmentTypeDto: CreateEquipmentTypeDto) {
    return this.prisma.equipmentType.create({
      data: createEquipmentTypeDto,
      include: { category: true },
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

  async findOne(id: number) {
    const type = await this.prisma.equipmentType.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!type)
      throw new NotFoundException(`Equipment type with ID ${id} not found`);
    return type;
  }

  async update(id: number, updateEquipmentTypeDto: UpdateEquipmentTypeDto) {
    await this.findOne(id);
    return this.prisma.equipmentType.update({
      where: { id },
      data: updateEquipmentTypeDto,
      include: { category: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.equipmentType.delete({ where: { id } });
  }

  async findByCategory(categoryId: number) {
    return this.prisma.equipmentType.findMany({
      where: { categoryId },
      include: { category: true },
    });
  }
}
