import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UnitsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUnitDto: CreateUnitDto) {
    const { name, abbreviation } = createUnitDto;
    return this.prisma.unit.create({
      data: { name, abbreviation },
    });
  }

  async findAll() {
    return this.prisma.unit.findMany({ where: { isActive: true } });
  }

  async findOne(id: number) {
    const unit = await this.prisma.unit.findUnique({ where: { id } });
    if (!unit) {
      throw new NotFoundException(`Unit with id ${id} not found`);
    }
    return unit;
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    await this.findOne(id);
    return this.prisma.unit.update({ where: { id }, data: updateUnitDto });
  }

  async remove(id: number) {
    // Soft delete: set isActive to false
    await this.findOne(id);
    return this.prisma.unit.update({ where: { id }, data: { isActive: false } });
  }
}
