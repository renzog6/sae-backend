// filepath: sae-backend/src/equipment/services/equipment-model.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateEquipmentModelDto } from "../dto/create-equipment-model.dto";
import { UpdateEquipmentModelDto } from "../dto/update-equipment-model.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";

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

  async findAll(pagination?: PaginationDto) {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.equipmentModel.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: "asc" },
        include: {
          brand: true,
          type: true,
        },
      }),
      this.prisma.equipmentModel.count(),
    ]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
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
