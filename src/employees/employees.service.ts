// filepath: sae-backend/src/employees/employees.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { EmployeeStatus, HistoryType, SeverityLevel } from "@prisma/client";
import { PaginationDto } from "../common/dto/pagination.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { HistoryLogService } from "../history/services/history-log.service";

@Injectable()
export class EmployeesService {
  constructor(
    private prisma: PrismaService,
    private historyLogService: HistoryLogService
  ) {}

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

  async findAll(pagination?: PaginationDto) {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 100;

    const q = (pagination?.q ?? "").trim();
    const status = (pagination?.status ?? "").trim();

    const where: any = {};
    if (status) {
      where.status = status as any;
    }
    if (q) {
      const qContains = { contains: q } as const;
      where.OR = [
        { employeeCode: qContains },
        { person: { is: { lastName: qContains } } },
        { person: { is: { firstName: qContains } } },
        { person: { is: { cuil: qContains } } },
      ];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.employee.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          company: true,
          category: true,
          position: true,
          person: true,
          vacations: true,
        },
        orderBy: { person: { lastName: "asc" } },
      }),
      this.prisma.employee.count({ where }),
    ]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number) {
    const emp = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        company: true,
        category: true,
        position: true,
        person: true,
        vacations: true,
      },
    });
    if (!emp) throw new NotFoundException(`Employee with ID ${id} not found`);
    return emp;
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

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.employee.delete({ where: { id } });
    return { id };
  }
}
