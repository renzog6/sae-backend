// filepath: sae-backend/src/modules/locations/provinces/provinces.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";
import { CreateProvinceDto } from "./dto/create-province.dto";
import { UpdateProvinceDto } from "./dto/update-province.dto";

@Injectable()
export class ProvincesService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.province;
  }

  protected buildSearchConditions(q: string) {
    return [
      { name: { contains: q, mode: "insensitive" } },
      { code: { contains: q, mode: "insensitive" } },
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

  async create(dto: CreateProvinceDto) {
    const province = await this.prisma.province.create({
      data: {
        code: dto.code,
        name: dto.name,
      } as any,
      include: { country: true, cities: true },
    });
    return { data: province };
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.province.delete({ where: { id } });
    return { message: "Province deleted successfully" };
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
