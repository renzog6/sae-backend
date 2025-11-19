// filepath: sae-backend/src/modules/locations/provinces/provinces.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";
import { CreateProvinceDto } from "./dto/create-province.dto";
import { UpdateProvinceDto } from "./dto/update-province.dto";

@Injectable()
export class ProvincesService {
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
        { code: { contains: q, mode: "insensitive" } },
      ];
    }

    // Get total count for pagination
    const total = await this.prisma.province.count({ where });

    // Get paginated data
    const provinces = await this.prisma.province.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: sortOrder },
      include: { country: true, cities: true },
    });

    return new BaseResponseDto(
      provinces,
      total,
      query.page || 1,
      query.limit || 10
    );
  }

  async findOne(id: number) {
    const province = await this.prisma.province.findUnique({
      where: { id },
      include: { country: true, cities: true },
    });
    if (!province)
      throw new NotFoundException(`Province with ID ${id} not found`);
    return province;
  }

  async create(dto: CreateProvinceDto) {
    return this.prisma.province.create({
      data: {
        code: dto.code,
        name: dto.name,
      } as any,
      include: { country: true, cities: true },
    });
  }

  async update(id: number, dto: UpdateProvinceDto) {
    const exists = await this.prisma.province.findUnique({ where: { id } });
    if (!exists)
      throw new NotFoundException(`Province with ID ${id} not found`);
    return this.prisma.province.update({
      where: { id },
      data: {
        ...(typeof dto.name !== "undefined" ? { name: dto.name } : {}),
        ...(typeof dto.code !== "undefined" ? { code: dto.code } : {}),
      } as any,
      include: { country: true, cities: true },
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.province.findUnique({ where: { id } });
    if (!exists)
      throw new NotFoundException(`Province with ID ${id} not found`);
    return this.prisma.province.delete({ where: { id } });
  }

  findByCode(code: string) {
    return this.prisma.province.findUnique({
      where: { code },
      include: { country: true, cities: true },
    });
  }

  findByCountry(countryId: number) {
    return this.prisma.province.findMany({
      where: { countryId },
      include: { country: true, cities: true },
    });
  }
}
