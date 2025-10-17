//filepath: sae-backend/src/tires/tires.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTireDto } from "./dto/create-tire.dto";
import { UpdateTireDto } from "./dto/update-tire.dto";

@Injectable()
export class TiresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTireDto) {
    return this.prisma.tire.create({ data });
  }

  async findAll() {
    return this.prisma.tire.findMany({
      include: {
        brand: true,
        size: { include: { aliases: true } },
        assignments: { include: { equipment: true } },
        rotations: true,
        recaps: true,
        inspections: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: number) {
    const tire = await this.prisma.tire.findUnique({
      where: { id },
      include: {
        brand: true,
        size: { include: { aliases: true } },
        assignments: { include: { equipment: true } },
        rotations: true,
        recaps: true,
        inspections: true,
      },
    });
    if (!tire) throw new NotFoundException("Tire not found");
    return tire;
  }

  async update(id: number, data: UpdateTireDto) {
    return this.prisma.tire.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.tire.delete({
      where: { id },
    });
  }
}
