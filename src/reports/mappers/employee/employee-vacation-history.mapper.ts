// filepath: sae-backend/src/reports/mappers/employee/employee-vacation-history.mapper.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

function formatDate(d: Date | null) {
  if (!d) return null;
  return d.toISOString().split("T")[0];
}

@Injectable()
export class EmployeeVacationHistoryMapper {
  constructor(private readonly prisma: PrismaService) {}

  async map(employeeId: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        person: true,
        vacations: true,
      },
    });

    if (!employee) throw new NotFoundException("Employee not found");

    // Ordenar por fecha
    const vacations = employee.vacations.sort(
      (a, b) =>
        new Date(a.settlementDate).getTime() -
        new Date(b.settlementDate).getTime()
    );

    const rows = vacations.map((v) => ({
      date: formatDate(v.settlementDate),
      type: v.type === "ASSIGNED" ? "Asignadas" : "Tomadas",
      days: v.days,
      year: v.year,
      period:
        v.startDate && v.endDate
          ? `${formatDate(v.startDate)} - ${formatDate(v.endDate)}`
          : "-",
      detail: v.detail ?? "-",
    }));

    // Calcular días disponibles
    const assigned = vacations
      .filter((v) => v.type === "ASSIGNED")
      .reduce((s, v) => s + v.days, 0);

    const taken = vacations
      .filter((v) => v.type === "TAKEN")
      .reduce((s, v) => s + v.days, 0);

    const availableDays = assigned - taken;

    const employeeName = `${employee.person.lastName} ${employee.person.firstName}`;

    return {
      employeeName,
      availableDays,
      rows,
    };
  }
}
