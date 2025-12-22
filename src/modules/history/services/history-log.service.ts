// filepath: sae-backend/src/modules/history/services/history-log.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { CreateHistoryLogDto } from "@modules/history/dto/create-history-log.dto";
import { HistoryLog } from "../entities/history-log.entity";

@Injectable()
export class HistoryLogService extends BaseService<HistoryLog> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.historyLog;
  }

  protected buildSearchConditions(q: string) {
    return [{ title: { contains: q } }, { description: { contains: q } }];
  }

  async createLog(createHistoryLogDto: CreateHistoryLogDto) {
    return this.create(createHistoryLogDto);
  }

  async create(data: CreateHistoryLogDto) {
    const log = await this.prisma.historyLog.create({
      data: {
        ...data,
        metadata:
          data.metadata && typeof data.metadata !== "string"
            ? JSON.stringify(data.metadata)
            : (data.metadata as string),
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
    // Note: Using explicit any to bypass strict type checks for dynamic where clause construction
    // in this specific helper.
    const whereClause: any = {};

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
