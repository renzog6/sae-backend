// filepath: sae-backend/src/modules/tires/tire-events/tire-events.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { CreateTireEventDto } from "./dto/create-tire-event.dto";
import { TireEventsQueryDto } from "./dto/tire-events-query.dto";
import { BaseResponseDto } from "@common/dto";
import { TireEventType } from "@prisma/client";

@Injectable()
export class TireEventsService extends BaseService<any> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.tireEvent;
  }

  protected override getDefaultOrderBy() {
    return { eventDate: "desc" };
  }

  protected buildSearchConditions(q: string) {
    return [
      { description: { contains: q } },
      { tire: { serialNumber: { contains: q } } },
    ];
  }

  async create(createTireEventDto: CreateTireEventDto) {
    const event = await this.prisma.tireEvent.create({
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
    return { data: event };
  }

  async findAll(
    query: TireEventsQueryDto = new TireEventsQueryDto()
  ): Promise<BaseResponseDto<any>> {
    // Build specialized filters in additionalWhere
    const where: any = {};

    if (query.tireId) where.tireId = query.tireId;
    if (query.eventType) where.eventType = query.eventType;
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
      where.eventDate = {};
      if (query.fromDate) {
        where.eventDate.gte = query.fromDate;
      }
      if (query.toDate) {
        where.eventDate.lte = query.toDate;
      }
    }

    const include = {
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
    };

    return super.findAll(query, where, include);
  }

  async findAllByTire(tireId: number) {
    const where = { tireId };
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
    // TODO: This method duplicates findAll logic but with a different signature.
    // Consider deprecating or unifying.

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

  // Preserve existing methods...

  async findOne(id: number) {
    const event = await this.prisma.tireEvent.findUnique({
      where: { id },
      include: {
        tire: true,
      },
    });
    return { data: event };
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

  // BaseService has remove, but here we can override or just alias
  async remove(id: number) {
    return super.remove(id);
  }

  // Método para registrar eventos automáticamente
  async registerEvent(
    tireId: number,
    type: TireEventType,
    description: string,
    kmAtEvent?: number,
    data?: any
  ) {
    const result = await this.create({
      tireId,
      type,
      description,
      date: new Date(),
      kmAtEvent,
      data,
    });
    return result;
  }
}
