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

  protected override async hasDeletedAt(): Promise<boolean> {
    return false;
  }

  protected buildSearchConditions(q: string) {
    return [{ name: { contains: q } }, { code: { contains: q } }];
  }

  protected override getDefaultOrderBy() {
    return { name: "asc" };
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    // Extract search query
    const q = query.q;

    // Build search filter (though base service builds OR, this explicit override is fine or we can rely on buildSearchConditions + q inside base)
    // Actually BaseService handles q -> buildSearchConditions -> OR.
    // So we can just delegate.

    return super.findAll(query);
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
