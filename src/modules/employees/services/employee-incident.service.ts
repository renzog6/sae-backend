// filepath: sae-backend/src/modules/employees/services/employee-incident.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { HistoryLogService } from "../../history/services/history-log.service";
import { CreateEmployeeIncidentDto } from "../dto/create-employee-incident.dto";
import { UpdateEmployeeIncidentDto } from "../../history/dto/update-employee-incident.dto";
import { EmployeeIncidentsQueryDto } from "../dto/employee-incidents-query.dto";
import { BaseResponseDto } from "@common/dto";
import { EmployeeIncidentType, HistoryType } from "@prisma/client";

@Injectable()
export class EmployeeIncidentService {
  constructor(
    private prisma: PrismaService,
    private historyLogService: HistoryLogService
  ) {}

  async createIncident(createIncidentDto: CreateEmployeeIncidentDto) {
    // Crear incidente estructurado
    const data = {
      ...createIncidentDto,
      startDate: new Date(createIncidentDto.startDate),
      endDate: new Date(createIncidentDto.endDate),
      createdAt: createIncidentDto.createdAt
        ? new Date(createIncidentDto.createdAt)
        : new Date(),
    };

    const incident = await this.prisma.employeeIncident.create({
      data,
      include: { employee: true },
    });

    // Crear log automático en historial general
    await this.historyLogService.createLog({
      title: `Incidente: ${incident.type}`,
      description: incident.description,
      type: this.mapToHistoryType(incident.type),
      severity: "WARNING",
      eventDate: incident.startDate || new Date(),
      employeeId: incident.employeeId,
      metadata: JSON.stringify({
        incidentId: incident.id,
        hasDoctorNote: incident.doctorNote,
        isPaidLeave: incident.paidLeave,
      }),
    });

    return { data: incident };
  }

  async findAll(
    query: EmployeeIncidentsQueryDto = new EmployeeIncidentsQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q, sortBy = "startDate", sortOrder = "desc" } = query;

    // Build search filter
    const where: any = {};
    if (query.employeeId) where.employeeId = query.employeeId;
    if (query.type) where.type = query.type;
    if (query.paidLeave !== undefined) where.paidLeave = query.paidLeave;

    // Add search filter if provided
    if (q) {
      where.OR = [
        { description: { contains: q, mode: "insensitive" } },
        { type: { equals: q as any } },
      ];
    }

    // Get paginated data and total count in a single transaction
    const [data, total] = await this.prisma.$transaction([
      this.prisma.employeeIncident.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
        include: { employee: true },
      }),
      this.prisma.employeeIncident.count({ where }),
    ]);

    return new BaseResponseDto(data, total, query.page || 1, query.limit || 10);
  }

  async findByEmployee(
    employeeId: number,
    query: EmployeeIncidentsQueryDto = new EmployeeIncidentsQueryDto()
  ): Promise<BaseResponseDto<any>> {
    query.employeeId = employeeId;
    return this.findAll(query);
  }

  async deleteIncident(id: number) {
    // First, get the incident to create a history log before deleting
    const incident = await this.prisma.employeeIncident.findUnique({
      where: { id },
    });

    if (!incident) {
      throw new Error("Incident not found");
    }

    // Delete the incident
    await this.prisma.employeeIncident.delete({
      where: { id },
    });

    // Optionally create a history log for the deletion
    await this.historyLogService.createLog({
      title: `Incidente eliminado: ${incident.type}`,
      description: `Se eliminó el incidente: ${incident.description}`,
      type: this.mapToHistoryType(incident.type),
      severity: "WARNING",
      eventDate: new Date(),
      employeeId: incident.employeeId,
      metadata: JSON.stringify({
        deletedIncidentId: incident.id,
      }),
    });

    return { success: true };
  }

  async updateIncident(
    id: number,
    updateIncidentDto: UpdateEmployeeIncidentDto
  ) {
    // Transform dates if provided
    const data = {
      ...updateIncidentDto,
      startDate: updateIncidentDto.startDate
        ? new Date(updateIncidentDto.startDate)
        : undefined,
      endDate: updateIncidentDto.endDate
        ? new Date(updateIncidentDto.endDate)
        : undefined,
    };

    const incident = await this.prisma.employeeIncident.update({
      where: { id },
      data,
      include: { employee: true },
    });

    // Create history log for the update
    await this.historyLogService.createLog({
      title: `Incidente actualizado: ${incident.type}`,
      description: `Se actualizó el incidente: ${incident.description}`,
      type: this.mapToHistoryType(incident.type),
      severity: "INFO",
      eventDate: new Date(),
      employeeId: incident.employeeId,
      metadata: JSON.stringify({
        updatedIncidentId: incident.id,
      }),
    });

    return { data: incident };
  }

  private mapToHistoryType(incidentType: EmployeeIncidentType): HistoryType {
    const mapping = {
      SICK_LEAVE: "EMPLOYEE_ILLNESS",
      DISCIPLINARY: "EMPLOYEE_WARNING",
      WARNING: "EMPLOYEE_WARNING",
      ACCIDENT: "EQUIPMENT_ACCIDENT", // Using EQUIPMENT_ACCIDENT as closest match
      FAMILY_EMERGENCY: "PERSONAL_EVENT", // Using PERSONAL_EVENT as closest match
      UNJUSTIFIED_ABSENCE: "GENERAL_NOTE", // Using GENERAL_NOTE as closest match
      VACATION_LEAVE: "PERSONAL_EVENT", // Using PERSONAL_EVENT as closest match
    };
    return mapping[incidentType] as HistoryType;
  }
}
