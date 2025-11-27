// filepath: sae-backend/src/modules/catalogs/brands/brands.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";

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
      { name: { contains: q, mode: "insensitive" } },
      { code: { contains: q, mode: "insensitive" } },
      { information: { contains: q, mode: "insensitive" } },
    ];
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

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    // For compatibility with client-side filtering, get all brands (no pagination)
    // This matches the pattern used in other modules like equipment
    const q = query.q;

    // Build search conditions
    const where: any = {
      deletedAt: null, // Only return non-deleted brands
    };

    if (q) {
      where.OR = this.buildSearchConditions(q);
    }

    // Get all brands without pagination for client-side filtering
    const brands = await this.prisma.brand.findMany({
      where,
      orderBy: {
        name: "asc", // Always sort by name ascending
      },
    });

    // Return in a compatible format
    return new BaseResponseDto(brands, brands.length, 1, brands.length);
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
