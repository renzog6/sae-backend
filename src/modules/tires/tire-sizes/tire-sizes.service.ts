import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { CreateTireSizeDto } from "./dto/create-tire-size.dto";
import { UpdateTireSizeDto } from "./dto/update-tire-size.dto";
import { TireSize } from "./entity/tire-size.entity";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";

@Injectable()
export class TireSizesService extends BaseService<TireSize> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.tireSize;
  }

  protected buildSearchConditions(q: string) {
    return [
      { mainCode: { contains: q } },
      {
        aliases: {
          some: {
            aliasCode: { contains: q },
          },
        },
      },
    ];
  }

  async create(data: CreateTireSizeDto) {
    const size = await this.prisma.tireSize.create({
      data,
      include: { aliases: true },
    });
    return { data: size };
  }

  protected override getDefaultOrderBy() {
    return { mainCode: "asc" };
  }

  override async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    return super.findAll(query, {}, { aliases: true });
  }

  override async findOne(id: number) {
    return super.findOne(id, { aliases: true });
  }

  override async update(id: number, data: UpdateTireSizeDto) {
    await this.findOne(id); // Check if exists
    const size = await this.prisma.tireSize.update({
      where: { id },
      data,
      include: { aliases: true },
    });
    return { data: size };
  }

  async getAliases(sizeId: number) {
    await this.findOne(sizeId); // Check if size exists
    return this.prisma.tireSizeAlias.findMany({
      where: { tireSizeId: sizeId },
      orderBy: { aliasCode: "asc" },
    });
  }
}

