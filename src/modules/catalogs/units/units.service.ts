// filepath: sae-backend/src/modules/catalogs/units/units.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUnitDto } from "./dto/create-unit.dto";
import { UpdateUnitDto } from "./dto/update-unit.dto";
import { PrismaService } from "@prisma/prisma.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";

@Injectable()
export class UnitsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUnitDto: CreateUnitDto) {
    const { name, abbreviation } = createUnitDto;
    return this.prisma.unit.create({
      data: { name, abbreviation },
    });
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q, sortBy = "name", sortOrder = "asc" } = query;

    // Build search conditions
    const where: any = {
      deletedAt: null, // Only return non-deleted units
    };

    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { abbreviation: { contains: q, mode: "insensitive" } },
      ];
    }

    // Get total count for pagination
    const total = await this.prisma.unit.count({ where });

    // Get units with pagination and sorting
    const units = await this.prisma.unit.findMany({
      where,
      skip,
      take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    return new BaseResponseDto(
      units,
      total,
      query.page || 1,
      query.limit || 10
    );
  }

  async findOne(id: number) {
    const unit = await this.prisma.unit.findFirst({
      where: {
        id,
        deletedAt: null, // Don't return deleted units
      },
    });
    if (!unit) {
      throw new NotFoundException(`Unit with id ${id} not found`);
    }
    return unit;
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    // Ensure unit exists and is not deleted
    await this.findOne(id);
    return this.prisma.unit.update({
      where: { id },
      data: updateUnitDto,
    });
  }

  async remove(id: number) {
    // Soft delete: set both isActive to false and deletedAt
    // Ensure unit exists
    await this.findOne(id);
    return this.prisma.unit.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });
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

    return this.prisma.unit.update({
      where: { id },
      data: {
        isActive: true,
        deletedAt: null,
      },
    });
  }
}
