//filepath: sae-backend/src/tires/tires.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BaseService } from "../common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "../common/dto/base-query.dto";
import { CreateTireDto } from "./dto/create-tire.dto";
import { UpdateTireDto } from "./dto/update-tire.dto";

@Injectable()
export class TiresService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.tire;
  }

  protected buildSearchConditions(q: string) {
    return [
      { serialNumber: { contains: q, mode: "insensitive" } },
      {
        model: {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            {
              brand: {
                name: { contains: q, mode: "insensitive" },
              },
            },
            {
              size: {
                OR: [
                  { mainCode: { contains: q, mode: "insensitive" } },
                  {
                    aliases: {
                      some: {
                        aliasCode: { contains: q, mode: "insensitive" },
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ];
  }

  async create(data: CreateTireDto) {
    return this.prisma.tire.create({ data });
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto(),
    status?: string
  ): Promise<BaseResponseDto<any>> {
    const additionalWhere: any = {};
    if (status) {
      additionalWhere.status = status;
    }

    const include = {
      model: {
        include: {
          brand: true,
          size: { include: { aliases: true } },
        },
      },
      assignments: {
        include: {
          positionConfig: {
            include: { axle: { include: { equipment: true } } },
          },
        },
      },
      rotations: true,
      recaps: true,
      inspections: true,
      events: true,
    };

    return super.findAll(query, additionalWhere, include);
  }

  async findOne(id: number) {
    const include = {
      model: {
        include: {
          brand: true,
          size: { include: { aliases: true } },
        },
      },
      assignments: {
        include: {
          positionConfig: {
            include: { axle: { include: { equipment: true } } },
          },
        },
      },
      rotations: true,
      recaps: true,
      inspections: true,
      events: true,
    };

    return super.findOne(id, include);
  }

  async update(id: number, data: UpdateTireDto) {
    return this.prisma.tire.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<void> {
    await super.remove(id);
  }
}
