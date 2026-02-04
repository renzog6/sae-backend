import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { calculateTenure } from "@common/utils/date.util";
import { formatAddress } from "../utils/address.util";
import { mapEmployeeStatus } from "../utils/status.util";

/**
 * Maps employee list data for reports.
 * @param filters Optional filters (status, categoryId, positionId)
 * @returns Array of employee data objects
 * @throws InternalServerErrorException if data mapping fails
 */
@Injectable()
export class EmployeeListMapper {
  constructor(private readonly prisma: PrismaService) { }

  async map(filters: Record<string, any>) {
    const { status, categoryId, positionId } = filters;

    const whereClause: any = {};
    if (status) whereClause.status = mapEmployeeStatus(status);
    if (categoryId) whereClause.categoryId = Number(categoryId);
    if (positionId) whereClause.positionId = Number(positionId);

    const employees = await this.prisma.employee.findMany({
      where: whereClause,
      include: {
        person: {
          include: {
            address: { include: { city: { include: { province: true } } } },
            contacts: {
              include: {
                contact: true,
              },
            },
          },
        },
        position: true,
        category: true,
      },
      orderBy: { person: { lastName: "asc" } },
    });

    return employees.map((employee) => {
      const phoneContact = employee.person.contacts.find(
        (c) => c.contact.type === "PHONE"
      );
      const emailContact = employee.person.contacts.find(
        (c) => c.contact.type === "EMAIL"
      );

      return {
        id: employee.id,
        employeeCode: employee.employeeCode,
        name: `${employee.person.lastName} ${employee.person.firstName}`,
        dni: employee.person.dni,
        birthDate: employee.person.birthDate.toISOString().split("T")[0],
        age: calculateTenure(employee.person.birthDate),
        cuil: employee.person.cuil,
        hireDate: employee.hireDate.toISOString().split("T")[0],
        seniority: calculateTenure(
          employee.hireDate,
          employee.status === "TERMINATED" ? employee.endDate : undefined
        ),
        position: employee.position.name,
        category: employee.category.name,
        address: formatAddress(employee.person.address),
        phone: phoneContact?.contact.value || "N/A",
        email: emailContact?.contact.value || "N/A",
        status: employee.status,
      };
    });
  }
}
