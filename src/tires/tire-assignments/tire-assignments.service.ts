//filepath: sae-backend/src/tires/tire-assignments/tire-assignments.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { MountTireDto } from "./dto/mount-tire.dto";
import { UnmountTireDto } from "./dto/unmount-tire.dto";
import { TireAssignmentEventsService } from "./tire-events.service";

@Injectable()
export class TireAssignmentsService {
  constructor(
    private prisma: PrismaService,
    private events: TireAssignmentEventsService
  ) {}

  // montar: crea assignment, marca tire IN_USE, etc
  async mount(dto: MountTireDto, userId?: number) {
    // validar existencia de tire
    const tire = await this.prisma.tire.findUnique({
      where: { id: dto.tireId },
    });
    if (!tire) throw new NotFoundException("Tire not found");

    // validar positionConfigId
    const positionConfig = await this.prisma.tirePositionConfig.findUnique({
      where: { id: dto.positionConfigId },
      include: { axle: { include: { equipment: true } } },
    });
    if (!positionConfig)
      throw new NotFoundException("Position config not found");

    // prevenir que el neumático ya esté montado sin finalizar (opcional: buscar assignment abierto)
    const openAssignment = await this.prisma.tireAssignment.findFirst({
      where: { tireId: dto.tireId, endDate: null },
    });
    if (openAssignment)
      throw new BadRequestException(
        "Tire already mounted (open assignment exists)"
      );

    // transacción: crear assignment y actualizar tire
    const result = await this.prisma.$transaction(async (tx) => {
      const assignment = await tx.tireAssignment.create({
        data: {
          tireId: dto.tireId,
          positionConfigId: dto.positionConfigId,
          startDate: new Date(),
          kmAtStart: dto.kmAtStart ?? null,
        },
      });

      await tx.tire.update({
        where: { id: dto.tireId },
        data: { status: "IN_USE", position: positionConfig.positionKey as any },
      });

      // registrar evento
      await tx.tireEvent.create({
        data: {
          tireId: dto.tireId,
          eventType: "ASSIGNMENT",
          description:
            dto.note ??
            `Mounted on equipment ${positionConfig.axle.equipment.name} pos ${positionConfig.positionKey}`,
          metadata: dto.kmAtStart
            ? JSON.stringify({
                kmAtStart: dto.kmAtStart,
                positionConfigId: dto.positionConfigId,
              })
            : JSON.stringify({ positionConfigId: dto.positionConfigId }),
        },
      });

      return assignment;
    });

    // opcional: crear evento centralizado (si lo preferís fuera de la tx)
    await this.events.createEvent({
      tireId: dto.tireId,
      eventType: "ASSIGNMENT",
      userId,
      description: dto.note,
      metadata: {
        positionConfigId: dto.positionConfigId,
        kmAtStart: dto.kmAtStart ?? null,
      },
    });

    return result;
  }

  // desmontar: cierra assignment, actualiza km totales, cambia status si corresponde
  async unmount(dto: UnmountTireDto, userId?: number) {
    const assignment = await this.prisma.tireAssignment.findUnique({
      where: { id: dto.assignmentId },
      include: {
        positionConfig: { include: { axle: { include: { equipment: true } } } },
      },
    });
    if (!assignment) throw new NotFoundException("Assignment not found");
    if (assignment.endDate)
      throw new BadRequestException("Assignment already closed");

    const tire = await this.prisma.tire.findUnique({
      where: { id: assignment.tireId },
    });
    if (!tire) throw new NotFoundException("Tire not found");

    // calcular delta km si hay lectura
    const kmAtStart = assignment.kmAtStart ?? null;
    const kmAtEnd = dto.kmAtEnd ?? null;
    const deltaKm =
      kmAtStart != null && kmAtEnd != null ? kmAtEnd - kmAtStart : null;

    const result = await this.prisma.$transaction(async (tx) => {
      const updatedAssignment = await tx.tireAssignment.update({
        where: { id: dto.assignmentId },
        data: {
          endDate: new Date(),
          kmAtEnd: kmAtEnd,
        },
      });

      // update totalKm on tire if delta available
      let updatedTire;
      if (deltaKm != null && deltaKm > 0) {
        updatedTire = await tx.tire.update({
          where: { id: assignment.tireId },
          data: {
            totalKm: { increment: deltaKm },
            status: "IN_STOCK",
            position: "UNKNOWN",
          },
        });
      } else {
        // if no km, just set status to IN_STOCK and clear position
        updatedTire = await tx.tire.update({
          where: { id: assignment.tireId },
          data: { status: "IN_STOCK", position: "UNKNOWN" },
        });
      }

      // create an event record
      await tx.tireEvent.create({
        data: {
          tireId: assignment.tireId,
          eventType: "UNASSIGNMENT",
          description:
            dto.note ??
            `Unmounted from equipment ${assignment.positionConfig.axle.equipment.name}`,
          metadata: JSON.stringify({
            kmAtStart,
            kmAtEnd,
            deltaKm,
            positionConfigId: assignment.positionConfigId,
          }),
        },
      });

      return { updatedAssignment, updatedTire };
    });

    // central event as well
    await this.events.createEvent({
      tireId: assignment.tireId,
      eventType: "UNASSIGNMENT",
      userId,
      description: dto.note,
      metadata: { assignmentId: dto.assignmentId, kmAtEnd, deltaKm },
    });

    return result;
  }

  // historial de assignments por tire
  async findByTire(tireId: number) {
    return this.prisma.tireAssignment.findMany({
      where: { tireId },
      include: {
        positionConfig: { include: { axle: { include: { equipment: true } } } },
      },
      orderBy: { startDate: "desc" },
    });
  }

  // opcional: obtener assignments abiertos
  async findOpenAssignments() {
    return this.prisma.tireAssignment.findMany({
      where: { endDate: null },
      include: {
        tire: true,
        positionConfig: { include: { axle: { include: { equipment: true } } } },
      },
    });
  }
}
