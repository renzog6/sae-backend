//filepath: sae-backend/src/modules/tires/tire-assignments/tire-events.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";

@Injectable()
export class TireAssignmentEventsService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.tireEvent;
  }

  protected buildSearchConditions(q: string) {
    return [{ description: { contains: q, mode: "insensitive" } }];
  }

  async createEvent(data: {
    tireId: number;
    eventType: string;
    userId?: number | null;
    description?: string | null;
    metadata?: Record<string, any> | null;
  }) {
    const event = await this.prisma.tireEvent.create({
      data: {
        tireId: data.tireId,
        eventType: data.eventType as any,
        userId: data.userId ?? null,
        description: data.description ?? null,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
      },
    });
    return { data: event };
  }
}
