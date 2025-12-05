//filepath: sae-backend/src/tires/tires.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseResponseDto } from "@common/dto";
import { TireQueryDto } from "./dto/tire-query.dto";
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
      { serialNumber: { contains: q } },
      {
        model: {
          OR: [
            { name: { contains: q } },
            {
              brand: {
                name: { contains: q },
              },
            },
            {
              size: {
                OR: [
                  { mainCode: { contains: q } },
                  {
                    aliases: {
                      some: {
                        aliasCode: { contains: q },
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
    const record = await this.prisma.tire.create({ data });
    return { data: record };
  }

  async findAll(
    query: TireQueryDto = new TireQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const additionalWhere: any = {};
    if (query.status) {
      additionalWhere.status = query.status;
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

    return await super.findOne(id, include);
  }

  async update(id: number, data: UpdateTireDto) {
    const record = await this.prisma.tire.update({
      where: { id },
      data,
    });
    return { data: record };
  }

  async remove(id: number): Promise<{ message: string }> {
    return await super.remove(id);
  }
}
