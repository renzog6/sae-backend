// filepath: sae-backend/src/modules/equipment/services/equipment-model.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateEquipmentModelDto } from "../dto/create-equipment-model.dto";
import { UpdateEquipmentModelDto } from "../dto/update-equipment-model.dto";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";

@Injectable()
export class EquipmentModelService {
  constructor(private prisma: PrismaService) {}

  async create(createEquipmentModelDto: CreateEquipmentModelDto) {
    return this.prisma.equipmentModel.create({
      data: createEquipmentModelDto,
      include: {
        brand: true,
        type: true,
      },
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
      this.prisma.equipmentModel.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
        include: {
          brand: true,
          type: true,
        },
      }),
      this.prisma.equipmentModel.count({ where }),
    ]);

    return new BaseResponseDto(data, total, query.page || 1, query.limit || 10);
  }

  async findOne(id: number) {
    const model = await this.prisma.equipmentModel.findUnique({
      where: { id },
      include: {
        brand: true,
        type: true,
      },
    });
    if (!model)
      throw new NotFoundException(`Equipment model with ID ${id} not found`);
    return model;
  }

  async update(id: number, updateEquipmentModelDto: UpdateEquipmentModelDto) {
    await this.findOne(id);
    return this.prisma.equipmentModel.update({
      where: { id },
      data: updateEquipmentModelDto,
      include: {
        brand: true,
        type: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.equipmentModel.delete({ where: { id } });
  }

  async findByType(typeId: number) {
    return this.prisma.equipmentModel.findMany({
      where: { typeId },
      include: {
        brand: true,
        type: true,
      },
    });
  }
}
