import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateEquipmentTypeDto } from "../dto/create-equipment-type.dto";
import { UpdateEquipmentTypeDto } from "../dto/update-equipment-type.dto";
import { PaginationDto } from "@common/dto/pagination.dto";

@Injectable()
export class EquipmentTypeService {
  constructor(private prisma: PrismaService) {}

  async create(createEquipmentTypeDto: CreateEquipmentTypeDto) {
    return this.prisma.equipmentType.create({
      data: createEquipmentTypeDto,
      include: { category: true },
    });
  }

  async findAll(pagination?: PaginationDto) {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.equipmentType.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: { category: true },
        orderBy: { name: "asc" },
      }),
      this.prisma.equipmentType.count(),
    ]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
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
