//filepath: sae-backend/src/tires/tire-sizes/tire-sizes.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";
import { CreateTireSizeDto } from "./dto/create-tire-size.dto";
import { UpdateTireSizeDto } from "./dto/update-tire-size.dto";

@Injectable()
export class TireSizesService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.tireSize;
  }

  protected buildSearchConditions(q: string) {
    return [{ mainCode: { contains: q, mode: "insensitive" } }];
  }

  async create(data: CreateTireSizeDto) {
    const size = await this.prisma.tireSize.create({
      data,
      include: { aliases: true },
    });
    return { data: size };
  }

  async findAll(options?: { page?: number; limit?: number; query?: string }) {
    const { page = 1, limit = 10, query } = options || {};

    const where = query
      ? {
          OR: [
            { mainCode: { contains: query } },
            {
              aliases: {
                some: {
                  aliasCode: { contains: query },
                },
              },
            },
          ],
        }
      : {};

    const [sizes, total] = await Promise.all([
      this.prisma.tireSize.findMany({
        where,
        include: { aliases: true },
        orderBy: { mainCode: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.tireSize.count({ where }),
    ]);

    return {
      data: sizes,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const size = await this.prisma.tireSize.findUnique({
      where: { id },
      include: { aliases: true },
    });
    if (!size) throw new NotFoundException("Tire size not found");
    return { data: size };
  }

  async update(id: number, data: UpdateTireSizeDto) {
    await this.findOne(id); // Check if exists
    const size = await this.prisma.tireSize.update({
      where: { id },
      data,
      include: { aliases: true },
    });
    return { data: size };
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id); // Check if exists
    await this.prisma.tireSize.delete({
      where: { id },
    });
    return { message: "Tire size deleted successfully" };
  }

  async getAliases(sizeId: number) {
    await this.findOne(sizeId); // Check if size exists
    return this.prisma.tireSizeAlias.findMany({
      where: { tireSizeId: sizeId },
      orderBy: { aliasCode: "asc" },
    });
  }
}
