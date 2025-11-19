// filepath: sae-backend/src/modules/locations/cities/cities.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";
import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q, sortBy = "name", sortOrder = "asc" } = query;

    // Build search filter
    const where: any = {};
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { postalCode: { contains: q, mode: "insensitive" } },
      ];
    }

    // Get total count for pagination
    const total = await this.prisma.city.count({ where });

    // Get paginated data
    const cities = await this.prisma.city.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: sortOrder },
      include: { province: true, addresses: true },
    });

    return new BaseResponseDto(
      cities,
      total,
      query.page || 1,
      query.limit || 10
    );
  }

  async findOne(id: number) {
    const city = await this.prisma.city.findUnique({
      where: { id },
      include: { province: true, addresses: true },
    });
    if (!city) throw new NotFoundException(`City with ID ${id} not found`);
    return city;
  }

  async create(dto: CreateCityDto) {
    return this.prisma.city.create({
      data: dto,
      include: { province: true, addresses: true },
    });
  }

  async update(id: number, dto: UpdateCityDto) {
    const exists = await this.prisma.city.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`City with ID ${id} not found`);
    return this.prisma.city.update({
      where: { id },
      data: dto,
      include: { province: true, addresses: true },
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.city.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`City with ID ${id} not found`);
    return this.prisma.city.delete({ where: { id } });
  }

  findByProvince(provinceId: number) {
    return this.prisma.city.findMany({
      where: { provinceId },
      include: { province: true, addresses: true },
    });
  }

  findByPostalCode(postalCode: string) {
    return this.prisma.city.findFirst({
      where: { postalCode },
      include: { province: true, addresses: true },
    });
  }
}
