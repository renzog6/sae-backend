// filepath: sae-backend/src/modules/tires/tire-positions/tire-positions.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateTirePositionDto } from "./dto/create-tire-position.dto";
import { UpdateTirePositionDto } from "./dto/update-tire-position.dto";

@Injectable()
export class TirePositionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTirePositionDto) {
    const position = await this.prisma.tirePositionConfig.create({
      data,
      include: {
        axle: true,
      },
    });
    return { data: position };
  }

  async findAll(axleId?: number) {
    const where = axleId ? { axleId } : {};

    const positions = await this.prisma.tirePositionConfig.findMany({
      where,
      include: {
        axle: true,
      },
    });

    return {
      data: positions,
      meta: {
        total: positions.length,
        page: 1,
        limit: positions.length,
        totalPages: 1,
      },
    };
  }

  async findOne(id: number) {
    const position = await this.prisma.tirePositionConfig.findUnique({
      where: { id },
      include: {
        axle: true,
      },
    });

    if (!position) throw new NotFoundException("Tire position not found");
    return { data: position };
  }

  async update(id: number, data: UpdateTirePositionDto) {
    await this.findOne(id); // Verificar que existe

    const position = await this.prisma.tirePositionConfig.update({
      where: { id },
      data,
      include: {
        axle: true,
      },
    });
    return { data: position };
  }

  async remove(id: number) {
    await this.findOne(id); // Verificar que existe

    await this.prisma.tirePositionConfig.delete({
      where: { id },
    });
    return { message: "Tire position deleted successfully" };
  }
}
