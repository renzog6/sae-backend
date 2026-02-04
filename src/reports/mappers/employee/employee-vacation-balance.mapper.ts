// filepath: sae-backend/src/reports/mappers/employee/employee-vacation-balance.mapper.ts
import { calculateTenure } from "@common/utils/date.util";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { calculateAvailableVacationDays } from "../utils/vacationDays.util";
import { mapEmployeeStatus } from "../utils/status.util";

/**
 * Maps employee vacation balance data for reports.
 * @param filters Optional filters ()
 * @returns Array of vacation balance data objects
 * @throws InternalServerErrorException if data mapping fails
 */

@Injectable()
export class EmployeeVacationBalanceMapper {
  constructor(private readonly prisma: PrismaService) { }
  async map(filters: Record<string, any>): Promise<any[]> {
    try {
      const { status, categoryId, positionId } = filters;

      const whereClause: any = {};
      if (status) whereClause.status = mapEmployeeStatus(status);
      if (categoryId) whereClause.categoryId = Number(categoryId);
      if (positionId) whereClause.positionId = Number(positionId);

      const employees = await this.prisma.employee.findMany({
        where: whereClause,
        include: {
          person: true,
          position: true,
          category: true,
          vacations: true,
        },
        orderBy: { person: { lastName: "asc" } },
      });

      return employees.map((employee) => ({
        employeeCode: employee.employeeCode,
        name: `${employee.person.lastName} ${employee.person.firstName}`,
        hireDate: employee.hireDate.toISOString().split("T")[0],
        seniority: calculateTenure(
          employee.hireDate,
          employee.status === "TERMINATED" ? employee.endDate : undefined
        ),
        days: calculateAvailableVacationDays(employee.vacations), // vacation days available
        position: employee.position.name,
        category: employee.category.name,
      }));
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve employee vacation data: ${error.message}. Please check database connection and try again.`
      );
    }
  }
}
