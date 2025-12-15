// filepath: sae-backend/src/modules/equipment/services/equipment-axles.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import {
  CreateEquipmentAxleDto,
  CreateEquipmentAxleWithPositionsDto,
} from "./dto/create-equipment-axle.dto";
import { UpdateEquipmentAxleDto } from "./dto/update-equipment-axle.dto";
import { EquipmentAxleQueryDto } from "./dto/equipment-axle-query.dto";
import { BaseResponseDto } from "@common/dto";

@Injectable()
export class EquipmentAxlesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateEquipmentAxleDto) {
    const axle = await this.prisma.equipmentAxle.create({
      data,
      include: {
        equipment: true,
        tirePositions: true,
      },
    });
    return { data: axle };
  }

  async findAll(
    query: EquipmentAxleQueryDto = new EquipmentAxleQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q, sortBy = "order", sortOrder = "asc" } = query;

    // Build WHERE clause
    const where: any = {};
    if (query.equipmentId) where.equipmentId = query.equipmentId;

    // Add search filter if provided
    if (q) {
      where.OR = [{ description: { contains: q } }];
    }

    // Execute query with transaction
    const [data, total] = await this.prisma.$transaction([
      this.prisma.equipmentAxle.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
        include: {
          equipment: true,
          tirePositions: true,
        },
      }),
      this.prisma.equipmentAxle.count({ where }),
    ]);

    return new BaseResponseDto(data, total, query.page || 1, query.limit || 10);
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
    return { data: axle };
  }

  async update(id: number, data: UpdateEquipmentAxleDto) {
    await this.findOne(id); // Verificar que existe

    const axle = await this.prisma.equipmentAxle.update({
      where: { id },
      data,
      include: {
        equipment: true,
        tirePositions: true,
      },
    });
    return { data: axle };
  }

  async remove(id: number) {
    await this.findOne(id); // Verificar que existe

    await this.prisma.equipmentAxle.delete({
      where: { id },
    });
    return { message: "Equipment axle deleted successfully" };
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
    const result = await this.prisma.$transaction(async (tx) => {
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
    return { data: result };
  }
}
