// filepath: sae-backend/src/modules/inspections/services/inspections.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class InspectionsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.inspection.findMany({
      include: {
        equipment: true,
        employee: true,
        inspectionType: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.inspection.findUnique({
      where: { id },
      include: {
        equipment: true,
        employee: true,
        inspectionType: true,
      },
    });
  }

  async findInspectionTypes() {
    return this.prisma.inspectionType.findMany();
  }
}
