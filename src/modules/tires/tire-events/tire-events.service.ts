// filepath: sae-backend/src/modules/tires/tire-events/tire-events.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateTireEventDto } from "./dto/create-tire-event.dto";
import { TireEventType } from "@prisma/client";

@Injectable()
export class TireEventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTireEventDto: CreateTireEventDto) {
    return this.prisma.tireEvent.create({
      data: {
        tireId: createTireEventDto.tireId,
        eventType: createTireEventDto.type,
        description: createTireEventDto.description,
        eventDate: createTireEventDto.date || new Date(),
        metadata: createTireEventDto.data
          ? JSON.stringify(createTireEventDto.data)
          : null,
      },
    });
  }

  async findAll(tireId?: number) {
    const where = tireId ? { tireId } : {};
    return this.prisma.tireEvent.findMany({
      where,
      include: {
        tire: true,
      },
      orderBy: {
        eventDate: "desc",
      },
    });
  }

  async findAllWithFilters(filters?: {
    page?: number;
    limit?: number;
    q?: string;
    eventType?: TireEventType;
    fromDate?: Date;
    toDate?: Date;
  }) {
    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filters?.eventType) {
      where.eventType = filters.eventType;
    }

    if (filters?.fromDate || filters?.toDate) {
      where.eventDate = {};
      if (filters.fromDate) {
        where.eventDate.gte = filters.fromDate;
      }
      if (filters.toDate) {
        where.eventDate.lte = filters.toDate;
      }
    }

    // Search filter for tire serial number or model
    if (filters?.q) {
      where.tire = {
        OR: [
          { serialNumber: { contains: filters.q } },
          {
            model: {
              OR: [
                { name: { contains: filters.q } },
                { brand: { name: { contains: filters.q } } },
                { size: { mainCode: { contains: filters.q } } },
              ],
            },
          },
        ],
      };
    }

    const [events, total] = await Promise.all([
      this.prisma.tireEvent.findMany({
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
        orderBy: {
          eventDate: "desc",
        },
        skip,
        take: limit,
      }),
      this.prisma.tireEvent.count({ where }),
    ]);

    return {
      data: events,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    return this.prisma.tireEvent.findUnique({
      where: { id },
      include: {
        tire: true,
      },
    });
  }

  async findByTireAndType(tireId: number, type: TireEventType) {
    return this.prisma.tireEvent.findMany({
      where: {
        tireId,
        eventType: type,
      },
      orderBy: {
        eventDate: "desc",
      },
    });
  }

  async remove(id: number) {
    return this.prisma.tireEvent.delete({
      where: { id },
    });
  }

  // Método para registrar eventos automáticamente
  async registerEvent(
    tireId: number,
    type: TireEventType,
    description: string,
    kmAtEvent?: number,
    data?: any
  ) {
    return this.create({
      tireId,
      type,
      description,
      date: new Date(),
      kmAtEvent,
      data,
    });
  }
}
