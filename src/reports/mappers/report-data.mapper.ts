// filepath: sae-backend/src/reports/mappers/report-data.mapper.ts
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

/**
 * Service for mapping database entities to report data structures.
 * Handles data transformation and filtering for various report types.
 */
@Injectable()
export class ReportDataMapper {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Maps employee vacation data for reports.
   * @param filters Optional filters (startDate, endDate)
   * @returns Array of vacation data objects
   * @throws InternalServerErrorException if data mapping fails
   */
  async mapEmployeeVacations(filters: Record<string, any>): Promise<any[]> {
    try {
      const { startDate, endDate } = filters;

      const whereClause: any = {};
      if (startDate || endDate) {
        whereClause.startDate = {};
        if (startDate) whereClause.startDate.gte = new Date(startDate);
        if (endDate) whereClause.startDate.lte = new Date(endDate);
      }

      const vacations = await this.prisma.employeeVacation.findMany({
        where: whereClause,
        include: {
          employee: {
            include: {
              person: true,
              position: true,
              category: true,
            },
          },
        },
      });

      return vacations.map((vacation) => ({
        employee: `${vacation.employee.person.firstName} ${vacation.employee.person.lastName}`,
        startDate: vacation.startDate.toISOString().split("T")[0],
        endDate: vacation.endDate.toISOString().split("T")[0],
        days: vacation.days,
        position: vacation.employee.position.name,
        category: vacation.employee.category.name,
      }));
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve employee vacation data: ${error.message}. Please check database connection and try again.`
      );
    }
  }

  /**
   * Maps employee list data for reports.
   * @param filters Optional filters (status, categoryId, positionId)
   * @returns Array of employee data objects
   * @throws InternalServerErrorException if data mapping fails
   */
  async mapEmployeeList(filters: Record<string, any>): Promise<any[]> {
    try {
      const { status, categoryId, positionId } = filters;

      const whereClause: any = {};
      if (status) whereClause.status = status;
      if (categoryId) whereClause.categoryId = parseInt(categoryId);
      if (positionId) whereClause.positionId = parseInt(positionId);

      const employees = await this.prisma.employee.findMany({
        where: whereClause,
        include: {
          person: true,
          position: true,
          category: true,
        },
      });

      return employees.map((employee) => ({
        id: employee.id,
        name: `${employee.person.firstName} ${employee.person.lastName}`,
        position: employee.position.name,
        category: employee.category.name,
        active: employee.isActive ? "Yes" : "No",
        hireDate: employee.hireDate.toISOString().split("T")[0],
        status: employee.status,
      }));
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve employee list data: ${error.message}. Please check database connection and filter parameters.`
      );
    }
  }

  /**
   * Maps equipment list data for reports.
   * @param filters Optional filters (status, categoryId, typeId)
   * @returns Array of equipment data objects
   * @throws InternalServerErrorException if data mapping fails
   */
  async mapEquipmentList(filters: Record<string, any>): Promise<any[]> {
    try {
      const { status, categoryId, typeId } = filters;

      const whereClause: any = {};
      if (status) whereClause.status = status;
      if (categoryId) whereClause.categoryId = parseInt(categoryId);
      if (typeId) whereClause.typeId = parseInt(typeId);

      const equipment = await this.prisma.equipment.findMany({
        where: whereClause,
        include: {
          category: true,
          type: true,
          model: {
            include: {
              brand: true,
            },
          },
        },
      });

      return equipment.map((item) => ({
        id: item.id,
        name: item.name || "N/A",
        brand: item.model?.brand?.name || "N/A",
        model: item.model?.name || "N/A",
        category: item.category?.name || "N/A",
        status: item.status,
        active: item.isActive ? "Yes" : "No",
        year: item.year || "N/A",
      }));
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve equipment list data: ${error.message}. Please check database connection and filter parameters.`
      );
    }
  }

  /**
   * Maps tire list data for reports.
   * @param filters Optional filters (status, brandId)
   * @returns Array of tire data objects
   * @throws InternalServerErrorException if data mapping fails
   */
  async mapTireList(filters: Record<string, any>): Promise<any[]> {
    try {
      const { status, brandId } = filters;

      const whereClause: any = {};
      if (status) whereClause.status = status;
      if (brandId) whereClause.model = { brandId: parseInt(brandId) };

      const tires = await this.prisma.tire.findMany({
        where: whereClause,
        include: {
          model: {
            include: {
              brand: true,
              size: true,
            },
          },
        },
      });

      return tires.map((tire) => ({
        id: tire.id,
        brand: tire.model.brand.name,
        model: tire.model.name,
        size: tire.model.size.mainCode,
        serialNumber: tire.serialNumber,
        status: tire.status,
        position: tire.position || "Not Assigned",
        active: tire.isActive ? "Yes" : "No",
      }));
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve tire list data: ${error.message}. Please check database connection and filter parameters.`
      );
    }
  }
}
