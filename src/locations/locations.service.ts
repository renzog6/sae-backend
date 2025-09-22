import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  CreateCityDto,
  UpdateCityDto,
  CreateAddressDto,
  UpdateAddressDto,
} from "./dto";

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  // Country methods
  async findAllCountries() {
    return this.prisma.country.findMany({
      include: {
        provinces: true,
      },
    });
  }

  async findOneCountry(id: number) {
    const country = await this.prisma.country.findUnique({
      where: { id },
      include: {
        provinces: true,
      },
    });

    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }

    return country;
  }

  async findProvincesByCountry(countryId: number) {
    return this.prisma.province.findMany({
      where: { countryId },
      include: {
        country: true,
        cities: true,
      },
    });
  }

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
    const city = await this.prisma.city.findUnique({
      where: { id },
      include: {
        province: true,
        addresses: true,
      },
    });

    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }

    return city;
  }

  async createCity(createCityDto: CreateCityDto) {
    return this.prisma.city.create({
      data: createCityDto,
      include: {
        province: true,
        addresses: true,
      },
    });
  }

  async updateCity(id: number, updateCityDto: UpdateCityDto) {
    const city = await this.prisma.city.findUnique({ where: { id } });

    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }

    return this.prisma.city.update({
      where: { id },
      data: updateCityDto,
      include: {
        province: true,
        addresses: true,
      },
    });
  }

  async removeCity(id: number) {
    const city = await this.prisma.city.findUnique({ where: { id } });

    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }

    return this.prisma.city.delete({
      where: { id },
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
    const address = await this.prisma.address.findUnique({
      where: { id },
      include: {
        city: {
          include: {
            province: true,
          },
        },
        company: true,
        person: true,
      },
    });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    return address;
  }

  async createAddress(createAddressDto: CreateAddressDto) {
    return this.prisma.address.create({
      data: createAddressDto,
      include: {
        city: {
          include: {
            province: true,
          },
        },
        company: true,
        person: true,
      },
    });
  }

  async updateAddress(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.prisma.address.findUnique({ where: { id } });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    return this.prisma.address.update({
      where: { id },
      data: updateAddressDto,
      include: {
        city: {
          include: {
            province: true,
          },
        },
        company: true,
        person: true,
      },
    });
  }

  async removeAddress(id: number) {
    const address = await this.prisma.address.findUnique({ where: { id } });

    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }

    return this.prisma.address.delete({
      where: { id },
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
