// file: sae-backend/src/locations/addresses/addresses.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.address.findMany({
      include: {
        city: { include: { province: true } },
        company: true,
        person: true,
      },
    });
  }

  async findOne(id: number) {
    const address = await this.prisma.address.findUnique({
      where: { id },
      include: {
        city: { include: { province: true } },
        company: true,
        person: true,
      },
    });
    if (!address) throw new NotFoundException(`Address with ID ${id} not found`);
    return address;
  }

  create(dto: CreateAddressDto) {
    return this.prisma.address.create({
      data: dto,
      include: {
        city: { include: { province: true } },
        company: true,
        person: true,
      },
    });
  }

  createForPerson(personId: number, dto: CreateAddressDto) {
    const { personId: _ignored, companyId: _ignoredCompany, ...rest } = dto;
    return this.prisma.address.create({
      data: { ...rest, personId },
      include: {
        city: { include: { province: true } },
        company: true,
        person: true,
      },
    });
  }

  createForCompany(companyId: number, dto: CreateAddressDto) {
    const { personId: _ignored, companyId: _ignoredCompany, ...rest } = dto;
    return this.prisma.address.create({
      data: { ...rest, companyId },
      include: {
        city: { include: { province: true } },
        company: true,
        person: true,
      },
    });
  }

  async update(id: number, dto: UpdateAddressDto) {
    const exists = await this.prisma.address.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Address with ID ${id} not found`);
    return this.prisma.address.update({
      where: { id },
      data: dto,
      include: {
        city: { include: { province: true } },
        company: true,
        person: true,
      },
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.address.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Address with ID ${id} not found`);
    return this.prisma.address.delete({ where: { id } });
  }

  findByCity(cityId: number) {
    return this.prisma.address.findMany({
      where: { cityId },
      include: { city: { include: { province: true } }, company: true },
    });
  }

  findByCompany(companyId: number) {
    return this.prisma.address.findMany({
      where: { companyId },
      include: { city: { include: { province: true } } },
    });
  }
}
