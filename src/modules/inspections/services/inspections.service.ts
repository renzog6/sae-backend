// filepath: sae-backend/src/modules/inspections/services/inspections.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";

@Injectable()
export class InspectionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q, sortBy = "createdAt", sortOrder = "desc" } = query;

    // Build search filter
    const where: any = {};
    if (q) {
      where.OR = [
        { equipment: { name: { contains: q, mode: "insensitive" } } },
        {
          employee: {
            person: { firstName: { contains: q, mode: "insensitive" } },
          },
        },
        {
          employee: {
            person: { lastName: { contains: q, mode: "insensitive" } },
          },
        },
        { inspectionType: { name: { contains: q, mode: "insensitive" } } },
      ];
    }

    // Execute query with transaction
    const [data, total] = await this.prisma.$transaction([
      this.prisma.inspection.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
        include: {
          equipment: true,
          employee: true,
          inspectionType: true,
        },
      }),
      this.prisma.inspection.count({ where }),
    ]);

    return new BaseResponseDto(data, total, query.page || 1, query.limit || 10);
  }

  async findOne(id: number) {
    return this.prisma.inspection.findUnique({
      where: { id },
      include: {
        equipment: true,
        employee: true,
        inspectionType: true,
      },
    });
  }

  async findInspectionTypes() {
    return this.prisma.inspectionType.findMany();
  }
}
