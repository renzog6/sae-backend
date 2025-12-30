// filepath: sae-backend/src/modules/catalogs/units/units.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";
import { CreateUnitDto } from "./dto/create-unit.dto";

@Injectable()
export class UnitsService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.unit;
  }

  protected buildSearchConditions(q: string) {
    return [
      { name: { contains: q } },
      { code: { contains: q } },
      { abbreviation: { contains: q } },
    ];
  }

  protected override getDefaultOrderBy() {
    return { name: "asc" };
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    // Extract search query
    const q = query.q;

    // Build search conditions
    const where: any = {
      deletedAt: null, // Only return non-deleted units
    };

    if (q) {
      where.OR = [{ name: { contains: q } }, { abbreviation: { contains: q } }];
    }
    return super.findAll(query, where);
  }

  async create(createUnitDto: CreateUnitDto) {
    const { name, abbreviation } = createUnitDto;
    const unit = await this.prisma.unit.create({
      data: { name, abbreviation },
    });
    return { data: unit };
  }

  async remove(id: number): Promise<{ message: string }> {
    // Soft delete: set both isActive to false and deletedAt
    // Ensure unit exists
    await this.findOne(id);
    await this.prisma.unit.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });
    return { message: "Unit deleted successfully" };
  }

  async restore(id: number) {
    // Restore: set isActive to true and clear deletedAt
    // Ensure unit exists (even if deleted)
    const unit = await this.prisma.unit.findUnique({
      where: { id },
    });
    if (!unit) {
      throw new NotFoundException(`Unit with id ${id} not found`);
    }

    const restoredUnit = await this.prisma.unit.update({
      where: { id },
      data: {
        isActive: true,
        deletedAt: null,
      },
    });
    return { data: restoredUnit };
  }
}
