// filepath: sae-backend/src/modules/locations/addresses/addresses.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q, sortBy = "street", sortOrder = "asc" } = query;

    // Build search filter
    const where: any = {};
    if (q) {
      where.OR = [
        { street: { contains: q, mode: "insensitive" } },
        { city: { name: { contains: q, mode: "insensitive" } } },
        { postalCode: { contains: q, mode: "insensitive" } },
      ];
    }

    // Get total count for pagination
    const total = await this.prisma.address.count({ where });

    // Get paginated data
    const addresses = await this.prisma.address.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: sortOrder },
      include: {
        city: { include: { province: true } },
        company: true,
        person: true,
      },
    });

    return new BaseResponseDto(
      addresses,
      total,
      query.page || 1,
      query.limit || 10
    );
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
    if (!address)
      throw new NotFoundException(`Address with ID ${id} not found`);
    return { data: address };
  }

  async create(dto: CreateAddressDto) {
    // If personId is present, enforce one address per person via upsert
    if (dto.personId) {
      const { personId, companyId: _ignoredCompany, ...rest } = dto as any;
      const address = await this.prisma.address.upsert({
        where: { personId },
        update: { ...rest },
        create: { ...rest, personId },
        include: {
          city: { include: { province: true } },
          company: true,
          person: true,
        },
      });
      return { data: address };
    }
    // Default create for company addresses or addresses without person linkage
    const address = await this.prisma.address.create({
      data: dto,
      include: {
        city: { include: { province: true } },
        company: true,
        person: true,
      },
    });
    return { data: address };
  }

  async createForPerson(personId: number, dto: CreateAddressDto) {
    const { personId: _ignored, companyId: _ignoredCompany, ...rest } = dto;
    // Upsert to ensure a single address per person
    const address = await this.prisma.address.upsert({
      where: { personId },
      update: { ...rest },
      create: { ...rest, personId },
      include: {
        city: { include: { province: true } },
        company: true,
        person: true,
      },
    });
    return { data: address };
  }

  async createForCompany(companyId: number, dto: CreateAddressDto) {
    const { personId: _ignored, companyId: _ignoredCompany, ...rest } = dto;
    const address = await this.prisma.address.create({
      data: { ...rest, companyId },
      include: {
        city: { include: { province: true } },
        company: true,
        person: true,
      },
    });
    return { data: address };
  }

  async update(id: number, dto: UpdateAddressDto) {
    const exists = await this.prisma.address.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Address with ID ${id} not found`);
    const address = await this.prisma.address.update({
      where: { id },
      data: dto,
      include: {
        city: { include: { province: true } },
        company: true,
        person: true,
      },
    });
    return { data: address };
  }

  async remove(id: number) {
    const exists = await this.prisma.address.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Address with ID ${id} not found`);
    await this.prisma.address.delete({ where: { id } });
    return { message: "Address deleted successfully" };
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

  findByPerson(personId: number) {
    return this.prisma.address.findMany({
      where: { personId },
      include: {
        city: { include: { province: true } },
        company: true,
        person: true,
      },
    });
  }
}
