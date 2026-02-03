// filepath: sae-backend/src/modules/locations/cities/cities.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";
import { CreateCityDto } from "./dto/create-city.dto";

@Injectable()
export class CitiesService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.city;
  }

  protected override async hasDeletedAt(): Promise<boolean> {
    return false;
  }

  protected buildSearchConditions(q: string) {
    return [{ name: { contains: q } }, { postalCode: { contains: q } }];
  }

  protected override getDefaultOrderBy() {
    return { name: "asc" };
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const q = query.q;
    const where: any = {};
    if (q) {
      where.OR = this.buildSearchConditions(q);
    }

    return super.findAll(
      query,
      where,
      { province: true, addresses: true }
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
