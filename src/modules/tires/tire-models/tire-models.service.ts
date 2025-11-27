//filepath: sae-backend/src/modules/tires/tire-models/tire-models.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { CreateTireModelDto } from "./dto/create-tire-model.dto";
import { UpdateTireModelDto } from "./dto/update-tire-model.dto";

@Injectable()
export class TireModelsService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.tireModel;
  }

  protected buildSearchConditions(q: string) {
    return [{ name: { contains: q, mode: "insensitive" } }];
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

  async findAll(options?: { page?: number; limit?: number }) {
    const { page = 1, limit = 10 } = options || {};

    const [models, total] = await Promise.all([
      this.prisma.tireModel.findMany({
        include: {
          brand: true,
          size: { include: { aliases: true } },
        },
        orderBy: { name: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.tireModel.count(),
    ]);

    return {
      data: models,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const model = await this.prisma.tireModel.findUnique({
      where: { id },
      include: {
        brand: true,
        size: { include: { aliases: true } },
      },
    });
    if (!model) throw new NotFoundException("Tire model not found");
    return { data: model };
  }

  async update(id: number, data: UpdateTireModelDto) {
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

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id); // Check if exists
    await this.prisma.tireModel.delete({
      where: { id },
    });
    return { message: "Tire model deleted successfully" };
  }
}
