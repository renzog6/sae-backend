import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { CreateTireModelDto } from "./dto/create-tire-model.dto";
import { UpdateTireModelDto } from "./dto/update-tire-model.dto";
import { TireModel } from "./entity/tire-model.entity";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";

@Injectable()
export class TireModelsService extends BaseService<TireModel> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.tireModel;
  }

  protected buildSearchConditions(q: string) {
    return [{ name: { contains: q } }];
  }

  async create(data: CreateTireModelDto) {
    const model = await this.prisma.tireModel.create({
      data,
      include: {
        brand: true,
        size: { include: { aliases: true } },
      },
    });
    return { data: model };
  }

  override async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    query.sortBy = query.sortBy ?? "name";
    query.sortOrder = query.sortOrder ?? "asc";

    const include = {
      brand: true,
      size: { include: { aliases: true } },
    };

    return super.findAll(query, {}, include);
  }

  override async findOne(id: number) {
    return super.findOne(id, {
      brand: true,
      size: { include: { aliases: true } },
    });
  }

  override async update(id: number, data: UpdateTireModelDto) {
    await this.findOne(id); // Check if exists
    const model = await this.prisma.tireModel.update({
      where: { id },
      data,
      include: {
        brand: true,
        size: { include: { aliases: true } },
      },
    });
    return { data: model };
  }
}

