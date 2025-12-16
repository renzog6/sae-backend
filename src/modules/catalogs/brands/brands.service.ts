// filepath: sae-backend/src/modules/catalogs/brands/brands.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";

@Injectable()
export class BrandsService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.brand;
  }

  protected buildSearchConditions(q: string) {
    return [
      { name: { contains: q } },
      { code: { contains: q } },
      { information: { contains: q } },
    ];
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    // Extract search query
    const q = query.q;

    // Default sort
    query.sortBy = query.sortBy ?? "name";
    query.sortOrder = query.sortOrder ?? "asc";

    // Build search conditions
    const where: any = {
      deletedAt: null, // Only return non-deleted brands
    };

    if (q) {
      where.OR = this.buildSearchConditions(q);
    }

    return super.findAll(query, where);
  }

  async create(createBrandDto: CreateBrandDto) {
    const { name, code, information } = createBrandDto;
    const brand = await this.prisma.brand.create({
      data: {
        name,
        code,
        information,
      },
    });
    return { data: brand };
  }

  async remove(id: number): Promise<{ message: string }> {
    // Soft delete: set both isActive to false and deletedAt
    // Ensure brand exists
    await this.findOne(id);
    await this.prisma.brand.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });
    return { message: "Brand deleted successfully" };
  }

  async restore(id: number) {
    // Restore: set isActive to true and clear deletedAt
    // Ensure brand exists (even if deleted)
    const brand = await this.prisma.brand.findUnique({
      where: { id },
    });
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }

    const restoredBrand = await this.prisma.brand.update({
      where: { id },
      data: {
        isActive: true,
        deletedAt: null,
      },
    });
    return { data: restoredBrand };
  }
}
