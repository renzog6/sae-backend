// filepath: sae-backend/src/modules/locations/provinces/provinces.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";
import { CreateProvinceDto } from "./dto/create-province.dto";

@Injectable()
export class ProvincesService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.province;
  }

  protected buildSearchConditions(q: string) {
    return [{ name: { contains: q } }, { code: { contains: q } }];
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    // Extract search query
    const q = query.q;

    // Build search filter
    const where: any = {};
    if (q) {
      where.OR = [{ name: { contains: q } }, { code: { contains: q } }];
    }

    // Get total count for pagination
    const total = await this.prisma.province.count({ where });

    return super.findAll(query, where);
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
