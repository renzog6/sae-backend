import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(private prisma: PrismaService) {}

  async create(createEquipmentDto: CreateEquipmentDto) {
    return this.prisma.equipment.create({
      data: createEquipmentDto,
    });
  }

  async findAll(page = 1, limit = 10, companyId?: number) {
    const skip = (page - 1) * limit;
    
    const where = companyId ? { companyId } : {};
    
    const [items, total] = await Promise.all([
      this.prisma.equipment.findMany({
        where,
        skip,
        take: limit,
        include: {
          company: true,
          category: true,
          type: true,
          model: true,
        },
      }),
      this.prisma.equipment.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const equipment = await this.prisma.equipment.findUnique({
      where: { id },
      include: {
        company: true,
        category: true,
        type: true,
        model: true,
      },
    });

    if (!equipment) {
      throw new NotFoundException(`Equipment with ID ${id} not found`);
    }

    return equipment;
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    try {
      return await this.prisma.equipment.update({
        where: { id },
        data: updateEquipmentDto,
      });
    } catch (error) {
      throw new NotFoundException(`Equipment with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.equipment.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Equipment with ID ${id} not found`);
    }
  }

  async findCategories() {
    return this.prisma.equipmentCategory.findMany();
  }

  async findTypes(categoryId?: number) {
    const where = categoryId ? { categoryId } : {};
    return this.prisma.equipmentType.findMany({ where });
  }

  async findModels(typeId?: number) {
    const where = typeId ? { typeId } : {};
    return this.prisma.equipmentModel.findMany({ where });
  }
}