//filepath: sae-backend/src/tires/tire-inspections/tire-inspections.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateTireInspectionDto } from "./dto/create-tire-inspection.dto";
import { UpdateTireInspectionDto } from "./dto/update-tire-inspection.dto";
import { TireAssignmentEventsService } from "../tire-assignments/tire-events.service";

@Injectable()
export class TireInspectionsService {
  constructor(
    private prisma: PrismaService,
    private events: TireAssignmentEventsService
  ) {}

  async create(createDto: CreateTireInspectionDto, userId?: number) {
    // Validar que el neumático existe
    const tire = await this.prisma.tire.findUnique({
      where: { id: createDto.tireId },
    });
    if (!tire) throw new NotFoundException("Tire not found");

    // Usar fecha proporcionada o fecha actual
    const inspectionDate = createDto.inspectionDate
      ? new Date(createDto.inspectionDate)
      : new Date();

    // Transacción: crear inspección y evento
    const result = await this.prisma.$transaction(async (tx) => {
      // Crear la inspección
      const inspection = await tx.tireInspection.create({
        data: {
          tireId: createDto.tireId,
          inspectionDate: inspectionDate,
          pressure: createDto.pressure,
          treadDepth: createDto.treadDepth,
          observation: createDto.observation,
        },
        include: { tire: true },
      });

      // Crear evento de inspección
      await tx.tireEvent.create({
        data: {
          tireId: createDto.tireId,
          eventType: "INSPECTION",
          eventDate: inspectionDate,
          userId: userId ?? null,
          description: createDto.observation ?? "Inspección técnica realizada",
          metadata: JSON.stringify({
            pressure: createDto.pressure,
            treadDepth: createDto.treadDepth,
            inspectionDate: inspectionDate.toISOString(),
          }),
        },
      });

      return inspection;
    });

    // Crear evento centralizado (fuera de la transacción)
    await this.events.createEvent({
      tireId: createDto.tireId,
      eventType: "INSPECTION",
      userId,
      description: createDto.observation,
      metadata: {
        pressure: createDto.pressure,
        treadDepth: createDto.treadDepth,
        inspectionDate: inspectionDate.toISOString(),
      },
    });

    return result;
  }

  async findAll(params?: { page?: number; limit?: number; q?: string }) {
    const { page = 1, limit = 10, q } = params || {};

    const where = q
      ? {
          OR: [
            { tire: { serialNumber: { contains: q } } },
            {
              tire: {
                model: {
                  brand: { name: { contains: q } },
                },
              },
            },
            {
              tire: {
                model: {
                  size: { mainCode: { contains: q } },
                },
              },
            },
          ],
        }
      : {};

    const total = await this.prisma.tireInspection.count({ where });

    const inspections = await this.prisma.tireInspection.findMany({
      where,
      include: {
        tire: {
          include: {
            model: {
              include: {
                brand: true,
                size: true,
              },
            },
          },
        },
      },
      orderBy: { inspectionDate: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: inspections,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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
