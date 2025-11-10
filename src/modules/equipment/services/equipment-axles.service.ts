// filepath: sae-backend/src/modules/equipment/services/equipment-axles.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import {
  CreateEquipmentAxleDto,
  CreateEquipmentAxleWithPositionsDto,
} from "../dto/create-equipment-axle.dto";
import { UpdateEquipmentAxleDto } from "../dto/update-equipment-axle.dto";

@Injectable()
export class EquipmentAxlesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEquipmentAxleDto) {
    return this.prisma.equipmentAxle.create({
      data,
      include: {
        equipment: true,
        tirePositions: true,
      },
    });
  }

  async findAll(equipmentId?: number) {
    const where = equipmentId ? { equipmentId } : {};

    return this.prisma.equipmentAxle.findMany({
      where,
      include: {
        equipment: true,
        tirePositions: true,
      },
      orderBy: { order: "asc" },
    });
  }

  async findOne(id: number) {
    const axle = await this.prisma.equipmentAxle.findUnique({
      where: { id },
      include: {
        equipment: true,
        tirePositions: true,
      },
    });

    if (!axle) throw new NotFoundException("Equipment axle not found");
    return axle;
  }

  async update(id: number, data: UpdateEquipmentAxleDto) {
    await this.findOne(id); // Verificar que existe

    return this.prisma.equipmentAxle.update({
      where: { id },
      data,
      include: {
        equipment: true,
        tirePositions: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verificar que existe

    return this.prisma.equipmentAxle.delete({
      where: { id },
    });
  }

  async findPositionsByEquipment(equipmentId: number) {
    return this.prisma.tirePositionConfig.findMany({
      where: {
        axle: {
          equipmentId: equipmentId,
        },
      },
      include: {
        axle: {
          include: {
            equipment: true,
          },
        },
      },
      orderBy: [{ axle: { order: "asc" } }, { positionKey: "asc" }],
    });
  }

  async createWithPositions(dto: CreateEquipmentAxleWithPositionsDto) {
    return this.prisma.$transaction(async (tx) => {
      // Create the axle
      const axle = await tx.equipmentAxle.create({
        data: dto.axle,
      });

      // Create all positions for this axle
      const positions = await Promise.all(
        dto.positions.map((position) =>
          tx.tirePositionConfig.create({
            data: {
              ...position,
              axleId: axle.id,
            },
          })
        )
      );

      // Return axle with positions
      return tx.equipmentAxle.findUnique({
        where: { id: axle.id },
        include: {
          tirePositions: true,
          equipment: true,
        },
      });
    });
  }
}
