// filepath: sae-backend/src/modules/locations/cities/cities.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";
import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";

@Injectable()
export class CitiesService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.city;
  }

  protected buildSearchConditions(q: string) {
    return [
      { name: { contains: q, mode: "insensitive" } },
      { postalCode: { contains: q, mode: "insensitive" } },
    ];
  }

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

  async create(dto: CreateCityDto) {
    const city = await this.prisma.city.create({
      data: dto,
      include: { province: true, addresses: true },
    });
    return { data: city };
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.city.delete({ where: { id } });
    return { message: "City deleted successfully" };
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
