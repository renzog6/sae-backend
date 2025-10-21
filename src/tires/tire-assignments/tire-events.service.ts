//filepath: sae-backend/src/tires/tire-assignments/tire-events.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class TireAssignmentEventsService {
  constructor(private prisma: PrismaService) {}

  async createEvent(data: {
    tireId: number;
    eventType: string;
    userId?: number | null;
    description?: string | null;
    metadata?: Record<string, any> | null;
  }) {
    return this.prisma.tireEvent.create({
      data: {
        tireId: data.tireId,
        eventType: data.eventType as any,
        userId: data.userId ?? null,
        description: data.description ?? null,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
      },
    });
  }
}
