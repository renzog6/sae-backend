// filepath: sae-backend/src/employees/employees.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BaseService } from "../common/services/base.service";
import { BaseResponseDto } from "../common/dto/base-query.dto";
import { EmployeeQueryDto } from "./dto/employee-query.dto";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { EmployeeStatus, HistoryType, SeverityLevel } from "@prisma/client";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { HistoryLogService } from "../history/services/history-log.service";

@Injectable()
export class EmployeesService extends BaseService<any> {
  constructor(
    prisma: PrismaService,
    private historyLogService: HistoryLogService
  ) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.employee;
  }

  protected buildSearchConditions(q: string) {
    return [
      { employeeCode: { contains: q, mode: "insensitive" } },
      { person: { is: { lastName: { contains: q, mode: "insensitive" } } } },
      { person: { is: { firstName: { contains: q, mode: "insensitive" } } } },
      { person: { is: { cuil: { contains: q, mode: "insensitive" } } } },
    ];
  }

  async create(dto: CreateEmployeeDto) {
    const employee = await this.prisma.employee.create({
      data: {
        employeeCode: dto.employeeCode,
        information: dto.information,
        status: (dto.status ?? EmployeeStatus.ACTIVE) as any,
        hireDate: new Date(dto.hireDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        company: dto.companyId ? { connect: { id: dto.companyId } } : undefined,
        category: { connect: { id: dto.categoryId } },
        position: { connect: { id: dto.positionId } },
        person: { connect: { id: dto.personId } },
      },
      include: {
        company: true,
        category: true,
        position: true,
        person: true,
        vacations: true,
      },
    });

    // Create history log for employee hire
    await this.historyLogService.createLog({
      title: `Nuevo empleado contratado`,
      description: `${employee.person.firstName} ${employee.person.lastName} comenzó a trabajar en la empresa`,
      type: HistoryType.EMPLOYEE_HIRE,
      severity: SeverityLevel.SUCCESS,
      eventDate: employee.hireDate,
      employeeId: employee.id,
      metadata: JSON.stringify({
        hireDate: employee.hireDate.toISOString(),
        employeeCode: employee.employeeCode,
        category: employee.category?.name,
        position: employee.position?.name,
      }),
    });

    return employee;
  }

  async findAll(
    query: EmployeeQueryDto = new EmployeeQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const additionalWhere: any = {};
    if (query.status) {
      additionalWhere.status = query.status;
    }

    const include = {
      company: true,
      category: true,
      position: true,
      person: true,
      vacations: true,
    };

    return super.findAll(query, additionalWhere, include);
  }

  async findOne(id: number) {
    const include = {
      company: true,
      category: true,
      position: true,
      person: true,
      vacations: true,
    };

    return super.findOne(id, include);
  }

  async update(id: number, dto: UpdateEmployeeDto) {
    await this.findOne(id);
    return this.prisma.employee.update({
      where: { id },
      data: {
        ...(typeof dto.employeeCode !== "undefined"
          ? { employeeCode: dto.employeeCode }
          : {}),
        ...(typeof dto.information !== "undefined"
          ? { information: dto.information }
          : {}),
        ...(typeof dto.status !== "undefined"
          ? { status: dto.status as any }
          : {}),
        ...(typeof dto.hireDate !== "undefined"
          ? { hireDate: new Date(dto.hireDate as any) }
          : {}),
        ...(typeof dto.endDate !== "undefined"
          ? { endDate: dto.endDate ? new Date(dto.endDate as any) : null }
          : {}),
        ...(typeof dto.companyId !== "undefined"
          ? {
              company: dto.companyId
                ? { connect: { id: dto.companyId } }
                : { disconnect: true },
            }
          : {}),
        ...(typeof dto.categoryId !== "undefined"
          ? { category: { connect: { id: dto.categoryId! } } }
          : {}),
        ...(typeof dto.positionId !== "undefined"
          ? { position: { connect: { id: dto.positionId! } } }
          : {}),
        ...(typeof dto.personId !== "undefined"
          ? { person: { connect: { id: dto.personId! } } }
          : {}),
      },
      include: {
        company: true,
        category: true,
        position: true,
        person: true,
        vacations: true,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await super.remove(id);
  }
}
