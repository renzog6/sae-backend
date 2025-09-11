import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  // Province methods
  async findAllProvinces() {
    return this.prisma.province.findMany({
      include: {
        cities: true,
      },
    });
  }

  async findOneProvince(id: number) {
    return this.prisma.province.findUnique({
      where: { id },
      include: {
        cities: true,
      },
    });
  }

  async findProvinceByCode(code: string) {
    return this.prisma.province.findUnique({
      where: { code },
      include: {
        cities: true,
      },
    });
  }

  // City methods
  async findAllCities() {
    return this.prisma.city.findMany({
      include: {
        province: true,
        addresses: true,
      },
    });
  }

  async findOneCity(id: number) {
    return this.prisma.city.findUnique({
      where: { id },
      include: {
        province: true,
        addresses: true,
      },
    });
  }

  async findCitiesByProvince(provinceId: number) {
    return this.prisma.city.findMany({
      where: { provinceId },
      include: {
        province: true,
        addresses: true,
      },
    });
  }

  async findCityByPostalCode(postalCode: string) {
    return this.prisma.city.findFirst({
      where: { postalCode },
      include: {
        province: true,
        addresses: true,
      },
    });
  }

  // Address methods
  async findAllAddresses() {
    return this.prisma.address.findMany({
      include: {
        city: {
          include: {
            province: true,
          },
        },
        company: true,
      },
    });
  }

  async findOneAddress(id: number) {
    return this.prisma.address.findUnique({
      where: { id },
      include: {
        city: {
          include: {
            province: true,
          },
        },
        company: true,
      },
    });
  }

  async findAddressesByCity(cityId: number) {
    return this.prisma.address.findMany({
      where: { cityId },
      include: {
        city: {
          include: {
            province: true,
          },
        },
        company: true,
      },
    });
  }

  async findAddressesByCompany(companyId: number) {
    return this.prisma.address.findMany({
      where: { companyId },
      include: {
        city: {
          include: {
            province: true,
          },
        },
      },
    });
  }
}