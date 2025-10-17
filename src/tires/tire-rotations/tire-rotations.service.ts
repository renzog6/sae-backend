//filepath: sae-backend/src/tires/tire-rotations/tire-rotations.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateTireRotationDto } from "./dto/create-tire-rotation.dto";
import { UpdateTireRotationDto } from "./dto/update-tire-rotation.dto";

@Injectable()
export class TireRotationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTireRotationDto) {
    // Validar que el neumático existe
    const tire = await this.prisma.tire.findUnique({
      where: { id: dto.tireId },
    });
    if (!tire) throw new NotFoundException("Tire not found");

    // Validar equipos si se especifican
    if (dto.fromEquipmentId) {
      const fromEquipment = await this.prisma.equipment.findUnique({
        where: { id: dto.fromEquipmentId },
      });
      if (!fromEquipment)
        throw new NotFoundException("From equipment not found");
    }

    if (dto.toEquipmentId) {
      const toEquipment = await this.prisma.equipment.findUnique({
        where: { id: dto.toEquipmentId },
      });
      if (!toEquipment) throw new NotFoundException("To equipment not found");
    }

    return this.prisma.tireRotation.create({
      data: {
        tireId: dto.tireId,
        fromEquipmentId: dto.fromEquipmentId,
        toEquipmentId: dto.toEquipmentId,
        fromPosition: dto.fromPosition,
        toPosition: dto.toPosition,
        rotationDate: dto.rotationDate ?? new Date(),
        kmAtRotation: dto.kmAtRotation,
      },
      include: { tire: true },
    });
  }

  async findAll() {
    return this.prisma.tireRotation.findMany({
      include: { tire: true },
      orderBy: { rotationDate: "desc" },
    });
  }

  async findOne(id: number) {
    const rotation = await this.prisma.tireRotation.findUnique({
      where: { id },
      include: { tire: true },
    });
    if (!rotation) throw new NotFoundException("Rotation not found");
    return rotation;
  }

  async findByTire(tireId: number) {
    return this.prisma.tireRotation.findMany({
      where: { tireId },
      orderBy: { rotationDate: "desc" },
    });
  }

  async update(id: number, dto: UpdateTireRotationDto) {
    // Validar que existe
    await this.findOne(id);

    return this.prisma.tireRotation.update({
      where: { id },
      data: dto,
      include: { tire: true },
    });
  }

  async remove(id: number) {
    // Validar que existe
    await this.findOne(id);

    return this.prisma.tireRotation.delete({
      where: { id },
    });
  }
}
