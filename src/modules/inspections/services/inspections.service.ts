import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";
import { CreateInspectionDto } from "../dto/create-inspection.dto";
import { Inspection } from "../entities/inspection.entity";

@Injectable()
export class InspectionsService extends BaseService<Inspection> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.inspection;
  }

  protected buildSearchConditions(q: string) {
    return [
      { equipment: { name: { contains: q } } },
      {
        employee: {
          person: { firstName: { contains: q } },
        },
      },
      {
        employee: {
          person: { lastName: { contains: q } },
        },
      },
      { inspectionType: { name: { contains: q } } },
    ];
  }

  async create(data: CreateInspectionDto) {
    const inspection = await this.prisma.inspection.create({
      data,
      include: {
        equipment: true,
        employee: true,
        inspectionType: true
      }
    });
    return { data: inspection };
  }

  protected override getDefaultOrderBy() {
    return { createdAt: "desc" };
  }

  override async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const include = {
      equipment: true,
      employee: true,
      inspectionType: true,
    };

    return super.findAll(query, {}, include);
  }
}

