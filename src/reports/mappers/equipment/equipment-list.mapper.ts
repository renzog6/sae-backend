// filepath: sae-backend/src/reports/mappers/equipment/equipment-list.mapper.ts
import { InternalServerErrorException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

/**
 * Maps equipment list data for reports.
 * @param filters Optional filters (status, categoryId, typeId)
 * @returns Array of equipment data objects
 * @throws InternalServerErrorException if data mapping fails
 */

@Injectable()
export class EquipmentListMapper {
  constructor(private readonly prisma: PrismaService) {}
  async map(filters: Record<string, any>): Promise<any[]> {
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
}
