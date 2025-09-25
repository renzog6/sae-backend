// file: sae-backend/src/locations/provinces/provinces.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';

@Injectable()
export class ProvincesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.province.findMany({ include: { country: true, cities: true } });
  }

  async findOne(id: number) {
    const province = await this.prisma.province.findUnique({ where: { id }, include: { country: true, cities: true } });
    if (!province) throw new NotFoundException(`Province with ID ${id} not found`);
    return province;
  }

  create(dto: CreateProvinceDto) {
    return this.prisma.province.create({
      data: ({
        code: dto.code,
        name: dto.name,
      } as any),
      include: { country: true, cities: true },
    });
  }

  async update(id: number, dto: UpdateProvinceDto) {
    const exists = await this.prisma.province.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Province with ID ${id} not found`);
    return this.prisma.province.update({
      where: { id },
      data: ({
        ...(typeof dto.name !== 'undefined' ? { name: dto.name } : {}),
        ...(typeof dto.code !== 'undefined' ? { code: dto.code } : {}),
      } as any),
      include: { country: true, cities: true },
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.province.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Province with ID ${id} not found`);
    return this.prisma.province.delete({ where: { id } });
  }

  findByCode(code: string) {
    return this.prisma.province.findUnique({ where: { code }, include: { country: true, cities: true } });
  }

  findByCountry(countryId: number) {
    return this.prisma.province.findMany({ where: { countryId }, include: { country: true, cities: true } });
  }
}
