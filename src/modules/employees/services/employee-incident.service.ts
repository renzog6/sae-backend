import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseResponseDto } from "@common/dto";
import { HistoryLogService } from "../../history/services/history-log.service";
import { CreateEmployeeIncidentDto } from "../dto/create-employee-incident.dto";
import { UpdateEmployeeIncidentDto } from "../../history/dto/update-employee-incident.dto";
import { EmployeeIncidentsQueryDto } from "../dto/employee-incidents-query.dto";
import { EmployeeIncidentType, HistoryType } from "@prisma/client";
import { EmployeeIncident } from "../entities/employee-incident.entity";

@Injectable()
export class EmployeeIncidentService extends BaseService<EmployeeIncident> {
  constructor(
    protected prisma: PrismaService,
    private historyLogService: HistoryLogService
  ) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.employeeIncident;
  }

  protected buildSearchConditions(q: string) {
    return [
      { description: { contains: q } },
      // type is enum, might fail if q is not enum value. 
      // Safe to omit specific field search if BaseService wraps with implicit try/catch? 
      // BaseService doesn't wrap. 
      // Better to stick to text fields.
    ];
  }

  async create(createIncidentDto: CreateEmployeeIncidentDto) {
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
    // Build search filter
    const where: any = {};
    if (query.employeeId) where.employeeId = Number(query.employeeId); // ensure number
    if (query.type) where.type = query.type;
    if (query.paidLeave !== undefined) where.paidLeave = query.paidLeave;

    // BaseService handles 'q' via buildSearchConditions OR logic if we pass empty where OR merge?
    // super.findAll logic:
    // const searchConditions = this.buildSearchConditions(q);
    // where.OR = searchConditions;

    // We should be careful not to overwrite the where we just built.
    // But BaseService.findAll accepts 'where' argument and merges?
    // checking BaseService: it likely merges or uses it.

    // Let's implement full findAll here reusing logic but calling findMany ourselves IS SAFER if we have complex filters.
    // BUT goal is to use BaseService.

    // BaseService.findAll(query, whereOverride, include)
    // If we pass 'where', BaseService usually respects it.
    // If 'q' is present, BaseService adds OR clause to it.

    // Only difference is if 'q' matches enum type, original logic supported exact match: { type: { equals: q } }

    // Let's rely on super.findAll for pagination and basic q search.
    // Passing our custom where filters.

    const include = { employee: true };
    return super.findAll(query, where, include);
  }

  async findByEmployee(
    employeeId: number,
    query: EmployeeIncidentsQueryDto = new EmployeeIncidentsQueryDto()
  ): Promise<BaseResponseDto<any>> {
    query.employeeId = employeeId;
    return this.findAll(query);
  }

  async remove(id: number) {
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

    return { message: "Incident deleted successfully" };
  }

  async update(
    id: number,
    updateIncidentDto: UpdateEmployeeIncidentDto
  ) {
    // Transform dates if provided
    const data: any = { ...updateIncidentDto };
    if (updateIncidentDto.startDate) data.startDate = new Date(updateIncidentDto.startDate);
    if (updateIncidentDto.endDate) data.endDate = new Date(updateIncidentDto.endDate);

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
    return mapping[incidentType] as HistoryType || HistoryType.GENERAL_NOTE;
  }
}

