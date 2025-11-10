import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateEquipmentCategoryDto } from "../dto/create-equipment-category.dto";
import { UpdateEquipmentCategoryDto } from "../dto/update-equipment-category.dto";
import { PaginationDto } from "@common/dto/pagination.dto";

@Injectable()
export class EquipmentCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createEquipmentCategoryDto: CreateEquipmentCategoryDto) {
    return this.prisma.equipmentCategory.create({
      data: createEquipmentCategoryDto,
      include: { types: true },
    });
  }

  async findAll(pagination?: PaginationDto) {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.equipmentCategory.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: { types: true },
        orderBy: { name: "asc" },
      }),
      this.prisma.equipmentCategory.count(),
    ]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
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
