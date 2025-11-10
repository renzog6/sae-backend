import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateTireModelDto } from "./dto/create-tire-model.dto";
import { UpdateTireModelDto } from "./dto/update-tire-model.dto";

@Injectable()
export class TireModelsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTireModelDto) {
    return this.prisma.tireModel.create({
      data,
      include: {
        brand: true,
        size: { include: { aliases: true } },
      },
    });
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
    return model;
  }

  async update(id: number, data: UpdateTireModelDto) {
    await this.findOne(id); // Check if exists
    return this.prisma.tireModel.update({
      where: { id },
      data,
      include: {
        brand: true,
        size: { include: { aliases: true } },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists
    return this.prisma.tireModel.delete({
      where: { id },
    });
  }
}
