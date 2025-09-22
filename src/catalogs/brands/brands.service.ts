// filepath: sae-backend/src/catalogs/brands/brands.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    const { name, code, information } = createBrandDto;
    return this.prisma.brand.create({
      data: {
        name,
        code,
        information,
      },
    });
  }

  async findAll() {
    // Return only active brands by default
    return this.prisma.brand.findMany({ where: { isActive: true } });
  }

  async findOne(id: number) {
    const brand = await this.prisma.brand.findUnique({ where: { id } });
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    // Ensure brand exists
    await this.findOne(id);
    return this.prisma.brand.update({ where: { id }, data: updateBrandDto });
  }

  async remove(id: number) {
    // Soft delete: set isActive to false
    // Ensure brand exists
    await this.findOne(id);
    return this.prisma.brand.update({ where: { id }, data: { isActive: false } });
  }
}
