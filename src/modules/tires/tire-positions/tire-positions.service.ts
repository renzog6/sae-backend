// filepath: sae-backend/src/modules/tires/tire-positions/tire-positions.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateTirePositionDto } from "./dto/create-tire-position.dto";
import { UpdateTirePositionDto } from "./dto/update-tire-position.dto";

@Injectable()
export class TirePositionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTirePositionDto) {
    return this.prisma.tirePositionConfig.create({
      data,
      include: {
        axle: true,
      },
    });
  }

  async findAll(axleId?: number) {
    const where = axleId ? { axleId } : {};

    return this.prisma.tirePositionConfig.findMany({
      where,
      include: {
        axle: true,
      },
    });
  }

  async findOne(id: number) {
    const position = await this.prisma.tirePositionConfig.findUnique({
      where: { id },
      include: {
        axle: true,
      },
    });

    if (!position) throw new NotFoundException("Tire position not found");
    return position;
  }

  async update(id: number, data: UpdateTirePositionDto) {
    await this.findOne(id); // Verificar que existe

    return this.prisma.tirePositionConfig.update({
      where: { id },
      data,
      include: {
        axle: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verificar que existe

    return this.prisma.tirePositionConfig.delete({
      where: { id },
    });
  }
}
