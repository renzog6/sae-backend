// filepath: sae-backend/src/reports/mappers/tire/tire-list.mapper.ts
import { InternalServerErrorException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

/**
 * Maps tire list data for reports.
 * @param filters Optional filters (status, brandId)
 * @returns Array of tire data objects
 * @throws InternalServerErrorException if data mapping fails
 */

@Injectable()
export class TireListMapper {
  constructor(private readonly prisma: PrismaService) {}
  async map(filters: Record<string, any>): Promise<any[]> {
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
