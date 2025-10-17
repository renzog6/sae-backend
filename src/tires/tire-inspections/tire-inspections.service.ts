//filepath: sae-backend/src/tires/tire-inspections/tire-inspections.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateTireInspectionDto } from "./dto/create-tire-inspection.dto";
import { UpdateTireInspectionDto } from "./dto/update-tire-inspection.dto";

@Injectable()
export class TireInspectionsService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateTireInspectionDto) {
    // Validar que el neumático existe
    const tire = await this.prisma.tire.findUnique({
      where: { id: createDto.tireId },
    });
    if (!tire) throw new NotFoundException("Tire not found");

    return this.prisma.tireInspection.create({
      data: {
        tireId: createDto.tireId,
        inspectionDate: createDto.inspectionDate ?? new Date(),
        pressure: createDto.pressure,
        treadDepth: createDto.treadDepth,
        observation: createDto.observation,
      },
      include: { tire: true },
    });
  }

  async findAll() {
    return this.prisma.tireInspection.findMany({
      include: { tire: true },
      orderBy: { inspectionDate: "desc" },
    });
  }

  async findOne(id: number) {
    const inspection = await this.prisma.tireInspection.findUnique({
      where: { id },
      include: { tire: true },
    });
    if (!inspection) throw new NotFoundException("Inspection not found");
    return inspection;
  }

  async findByTire(tireId: number) {
    return this.prisma.tireInspection.findMany({
      where: { tireId },
      orderBy: { inspectionDate: "desc" },
    });
  }

  async update(id: number, updateDto: UpdateTireInspectionDto) {
    // Validar que existe
    await this.findOne(id);

    return this.prisma.tireInspection.update({
      where: { id },
      data: updateDto,
      include: { tire: true },
    });
  }

  async remove(id: number) {
    // Validar que existe
    await this.findOne(id);

    return this.prisma.tireInspection.delete({
      where: { id },
    });
  }
}
