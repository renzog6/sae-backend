// filepath: sae-backend/src/modules/history/services/history-log.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateHistoryLogDto } from "@modules/history/dto/create-history-log.dto";

@Injectable()
export class HistoryLogService {
  constructor(private prisma: PrismaService) {}

  async createLog(createHistoryLogDto: CreateHistoryLogDto) {
    const log = await this.prisma.historyLog.create({
      data: {
        ...createHistoryLogDto,
        metadata: createHistoryLogDto.metadata
          ? JSON.stringify(createHistoryLogDto.metadata)
          : null,
      },
    });
    return { data: log };
  }

  async findByEntity(entityType: string, entityId: number) {
    const whereClause = this.buildWhereClause(entityType, entityId);

    return this.prisma.historyLog.findMany({
      where: whereClause,
      orderBy: { eventDate: "desc" },
    });
  }

  private buildWhereClause(entityType: string, entityId: number) {
    const whereClause = {
      employeeId: null,
      companyId: null,
      equipmentId: null,
      personId: null,
    };

    switch (entityType) {
      case "employee":
        whereClause.employeeId = entityId;
        break;
      case "company":
        whereClause.companyId = entityId;
        break;
      case "equipment":
        whereClause.equipmentId = entityId;
        break;
      case "person":
        whereClause.personId = entityId;
        break;
    }

    return whereClause;
  }
}
