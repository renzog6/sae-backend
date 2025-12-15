// filepath: sae-backend/src/modules/locations/countries/countries.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";
import { CreateCountryDto } from "./dto/create-country.dto";

@Injectable()
export class CountriesService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.country;
  }

  protected buildSearchConditions(q: string) {
    return [{ name: { contains: q } }, { isoCode: { contains: q } }];
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q, sortBy = "name", sortOrder = "asc" } = query;

    // Build search filter
    const where: any = {};
    if (q) {
      where.OR = [{ name: { contains: q } }, { isoCode: { contains: q } }];
    }

    // Get total count for pagination
    const total = await this.prisma.country.count({ where });

    // Get paginated data
    const countries = await this.prisma.country.findMany({
      where,
      skip,
      take,
      orderBy: { [sortBy]: sortOrder },
      include: { provinces: true },
    });

    return new BaseResponseDto(
      countries,
      total,
      query.page || 1,
      query.limit || 10
    );
  }

  async create(dto: CreateCountryDto) {
    const { name, code, isoCode } = dto as any;
    const country = await this.prisma.country.create({
      data: {
        name,
        isoCode: isoCode ?? code, // map 'code' to prisma 'isoCode' for backward compatibility
      },
      include: { provinces: true },
    });
    return { data: country };
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.country.delete({ where: { id } });
    return { message: "Country deleted successfully" };
  }

  findProvinces(countryId: number) {
    return this.prisma.province.findMany({
      where: { countryId },
      include: { country: true, cities: true },
    });
  }
}
