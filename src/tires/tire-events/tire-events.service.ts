// filepath: sae-backend/src/tires/tire-events/tire-events.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
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
