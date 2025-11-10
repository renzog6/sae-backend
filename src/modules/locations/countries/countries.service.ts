// filepath: sae-backend/src/modules/locations/countries/countries.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateCountryDto } from "./dto/create-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto";

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.country.findMany({ include: { provinces: true } });
  }

  async findOne(id: number) {
    const country = await this.prisma.country.findUnique({
      where: { id },
      include: { provinces: true },
    });
    if (!country)
      throw new NotFoundException(`Country with ID ${id} not found`);
    return country;
  }

  create(dto: CreateCountryDto) {
    const { name, code, isoCode } = dto as any;
    return this.prisma.country.create({
      data: {
        name,
        isoCode: isoCode ?? code, // map 'code' to prisma 'isoCode' for backward compatibility
      },
      include: { provinces: true },
    });
  }

  async update(id: number, dto: UpdateCountryDto) {
    const exists = await this.prisma.country.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Country with ID ${id} not found`);
    const { name, code, isoCode } = dto as any;
    return this.prisma.country.update({
      where: { id },
      data: {
        ...(typeof name !== "undefined" ? { name } : {}),
        ...(typeof code !== "undefined" || typeof isoCode !== "undefined"
          ? { isoCode: isoCode ?? code }
          : {}),
      },
      include: { provinces: true },
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.country.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Country with ID ${id} not found`);
    return this.prisma.country.delete({ where: { id } });
  }

  findProvinces(countryId: number) {
    return this.prisma.province.findMany({
      where: { countryId },
      include: { country: true, cities: true },
    });
  }
}
