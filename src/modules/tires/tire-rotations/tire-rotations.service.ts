//filepath: sae-backend/src/tires/tire-rotations/tire-rotations.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateTireRotationDto } from "./dto/create-tire-rotation.dto";
import { UpdateTireRotationDto } from "./dto/update-tire-rotation.dto";
import { TireAssignmentEventsService } from "@modules/tires/tire-assignments/tire-events.service";

@Injectable()
export class TireRotationsService {
  constructor(
    private prisma: PrismaService,
    private events: TireAssignmentEventsService
  ) {}

  async create(dto: CreateTireRotationDto, userId?: number) {
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

    // Usar fecha proporcionada o fecha actual
    const rotationDate = dto.rotationDate
      ? new Date(dto.rotationDate)
      : new Date();

    // Transacción: crear rotación, actualizar posición del neumático y crear evento
    const result = await this.prisma.$transaction(async (tx) => {
      // Crear la rotación
      const rotation = await tx.tireRotation.create({
        data: {
          tireId: dto.tireId,
          fromEquipmentId: dto.fromEquipmentId,
          toEquipmentId: dto.toEquipmentId,
          fromPosition: dto.fromPosition,
          toPosition: dto.toPosition,
          rotationDate: rotationDate,
          kmAtRotation: dto.kmAtRotation,
        },
        include: { tire: true },
      });

      // Actualizar la posición del neumático
      await tx.tire.update({
        where: { id: dto.tireId },
        data: { position: dto.toPosition },
      });

      // ✅ ACTUALIZAR LA ASIGNACIÓN ABIERTA PARA QUE APUNTE A LA NUEVA POSICIÓN
      const openAssignment = await tx.tireAssignment.findFirst({
        where: {
          tireId: dto.tireId,
          endDate: null,
        },
      });

      if (openAssignment) {
        // Encontrar la nueva positionConfigId basada en toPosition
        // Para rotaciones intra-equipo, buscar en el mismo equipo
        // Para rotaciones inter-equipo, buscar en el equipo destino
        const targetEquipmentId = dto.toEquipmentId || dto.fromEquipmentId;

        if (targetEquipmentId) {
          const newPositionConfig = await tx.tirePositionConfig.findFirst({
            where: {
              positionKey: dto.toPosition,
              axle: {
                equipmentId: targetEquipmentId,
              },
            },
          });

          if (newPositionConfig) {
            await tx.tireAssignment.update({
              where: { id: openAssignment.id },
              data: { positionConfigId: newPositionConfig.id },
            });
          }
        }
      }

      // Crear evento de rotación
      await tx.tireEvent.create({
        data: {
          tireId: dto.tireId,
          eventType: "ROTATION",
          eventDate: rotationDate,
          userId: userId ?? null,
          description:
            dto.notes ??
            `Rotated from ${dto.fromPosition} to ${dto.toPosition}${dto.fromEquipmentId && dto.toEquipmentId ? ` (equipment ${dto.fromEquipmentId} -> ${dto.toEquipmentId})` : ""}`,
          metadata: JSON.stringify({
            fromPosition: dto.fromPosition,
            toPosition: dto.toPosition,
            fromEquipmentId: dto.fromEquipmentId,
            toEquipmentId: dto.toEquipmentId,
            kmAtRotation: dto.kmAtRotation,
            rotationDate: rotationDate.toISOString(),
          }),
        },
      });

      return rotation;
    });

    // Crear evento centralizado (fuera de la transacción)
    await this.events.createEvent({
      tireId: dto.tireId,
      eventType: "ROTATION",
      userId,
      description: dto.notes,
      metadata: {
        fromPosition: dto.fromPosition,
        toPosition: dto.toPosition,
        fromEquipmentId: dto.fromEquipmentId,
        toEquipmentId: dto.toEquipmentId,
        kmAtRotation: dto.kmAtRotation,
        rotationDate: rotationDate.toISOString(),
      },
    });

    return result;
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
