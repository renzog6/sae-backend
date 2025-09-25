// file: sae-backend/src/locations/cities/cities.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.city.findMany({ include: { province: true, addresses: true } });
  }

  async findOne(id: number) {
    const city = await this.prisma.city.findUnique({
      where: { id },
      include: { province: true, addresses: true },
    });
    if (!city) throw new NotFoundException(`City with ID ${id} not found`);
    return city;
  }

  create(dto: CreateCityDto) {
    return this.prisma.city.create({ data: dto, include: { province: true, addresses: true } });
  }

  async update(id: number, dto: UpdateCityDto) {
    const exists = await this.prisma.city.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`City with ID ${id} not found`);
    return this.prisma.city.update({ where: { id }, data: dto, include: { province: true, addresses: true } });
  }

  async remove(id: number) {
    const exists = await this.prisma.city.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`City with ID ${id} not found`);
    return this.prisma.city.delete({ where: { id } });
  }

  findByProvince(provinceId: number) {
    return this.prisma.city.findMany({ where: { provinceId }, include: { province: true, addresses: true } });
  }

  findByPostalCode(postalCode: string) {
    return this.prisma.city.findFirst({ where: { postalCode }, include: { province: true, addresses: true } });
  }
}
