//filepath: sae-backend/src/tires/tire-inspections/tire-inspections.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateTireInspectionDto } from "./dto/create-tire-inspection.dto";
import { UpdateTireInspectionDto } from "./dto/update-tire-inspection.dto";
import { TireInspectionsQueryDto } from "./dto/tire-inspections-query.dto";
import { BaseResponseDto } from "@common/dto";
import { TireAssignmentEventsService } from "@modules/tires/tire-assignments/tire-events.service";

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

    return { data: result };
  }

  async findAll(
    query: TireInspectionsQueryDto = new TireInspectionsQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const {
      skip,
      take,
      q,
      sortBy = "inspectionDate",
      sortOrder = "desc",
    } = query;

    // Build search filter
    const where: any = {};
    if (query.tireId) where.tireId = query.tireId;

    if (query.equipmentId) {
      where.tire = {
        assignments: {
          some: {
            positionConfig: {
              axle: {
                equipmentId: query.equipmentId,
              },
            },
          },
        },
      };
    }

    // Add date range filter
    if (query.fromDate || query.toDate) {
      where.inspectionDate = {};
      if (query.fromDate) {
        where.inspectionDate.gte = query.fromDate;
      }
      if (query.toDate) {
        where.inspectionDate.lte = query.toDate;
      }
    }

    // Add pressure filter
    if (query.minPressure !== undefined) {
      where.pressure = { gte: query.minPressure };
    }

    // Add tread depth filter
    if (query.minTreadDepth !== undefined) {
      where.treadDepth = { gte: query.minTreadDepth };
    }

    // Add search filter if provided
    if (q) {
      where.OR = [
        { tire: { serialNumber: { contains: q, mode: "insensitive" } } },
        { observation: { contains: q, mode: "insensitive" } },
        {
          tire: {
            model: {
              brand: { name: { contains: q, mode: "insensitive" } },
            },
          },
        },
        {
          tire: {
            model: {
              size: { mainCode: { contains: q, mode: "insensitive" } },
            },
          },
        },
      ];
    }

    // Get paginated data and total count in a single transaction
    const [data, total] = await this.prisma.$transaction([
      this.prisma.tireInspection.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
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
      }),
      this.prisma.tireInspection.count({ where }),
    ]);

    return new BaseResponseDto(data, total, query.page || 1, query.limit || 10);
  }

  async findOne(id: number) {
    const inspection = await this.prisma.tireInspection.findUnique({
      where: { id },
      include: { tire: true },
    });
    if (!inspection) throw new NotFoundException("Inspection not found");
    return { data: inspection };
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

    const inspection = await this.prisma.tireInspection.update({
      where: { id },
      data: updateDto,
      include: { tire: true },
    });
    return { data: inspection };
  }

  async remove(id: number) {
    // Validar que existe
    await this.findOne(id);

    await this.prisma.tireInspection.delete({
      where: { id },
    });
    return { message: "Tire inspection deleted successfully" };
  }
}
