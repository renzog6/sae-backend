// filepath: sae-backend/src/modules/history/services/employee-incident.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { HistoryLogService } from "./history-log.service";
import { CreateEmployeeIncidentDto } from "../dto/create-employee-incident.dto";
import { UpdateEmployeeIncidentDto } from "../dto/update-employee-incident.dto";
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

    return incident;
  }

  async findByEmployee(employeeId: number) {
    return this.prisma.employeeIncident.findMany({
      where: { employeeId },
      orderBy: { startDate: "desc" },
    });
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

    return incident;
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
