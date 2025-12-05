// filepath: sae-backend/src/modules/inspections/services/inspections.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";

@Injectable()
export class InspectionsService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.inspection;
  }

  protected buildSearchConditions(q: string) {
    return [
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

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q, sortBy = "createdAt", sortOrder = "desc" } = query;

    // Build search filter
    const where: any = {};
    if (q) {
      where.OR = this.buildSearchConditions(q);
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

  async findInspectionTypes() {
    return this.prisma.inspectionType.findMany();
  }
}
