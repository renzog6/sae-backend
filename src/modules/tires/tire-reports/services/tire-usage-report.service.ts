// filepath: sae-backend/src/modules/tires/tire-reports/services/tire-usage-report.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class TireUsageReportService {
  constructor(private readonly prisma: PrismaService) {}

  async generateUsageReport(
    startDate: Date,
    endDate: Date,
    equipmentId?: number
  ) {
    // Filtros de fecha para cada tipo de entidad
    const assignmentDateFilter = {
      startDate: {
        gte: startDate,
        lte: endDate,
      },
    };

    const eventDateFilter = {
      eventDate: {
        gte: startDate,
        lte: endDate,
      },
    };

    const inspectionDateFilter = {
      inspectionDate: {
        gte: startDate,
        lte: endDate,
      },
    };

    // Consulta para obtener asignaciones de neumáticos
    const assignments = await this.prisma.tireAssignment.findMany({
      where: {
        ...assignmentDateFilter,
        ...(equipmentId ? { positionConfig: { axle: { equipmentId } } } : {}),
      },
      include: {
        tire: {
          include: {
            model: true,
          },
        },
        positionConfig: { include: { axle: { include: { equipment: true } } } },
      },
    });

    // Consulta para obtener rotaciones de neumáticos
    const rotations = await this.prisma.tireRotation.findMany({
      where: {
        rotationDate: {
          gte: startDate,
          lte: endDate,
        },
        ...(equipmentId
          ? {
              OR: [
                { fromEquipmentId: equipmentId },
                { toEquipmentId: equipmentId },
              ],
            }
          : {}),
      },
      include: {
        tire: {
          include: {
            model: true,
          },
        },
      },
    });

    // Consulta para obtener inspecciones de neumáticos
    const inspections = await this.prisma.tireInspection.findMany({
      where: {
        ...inspectionDateFilter,
        ...(equipmentId
          ? {
              tire: {
                assignments: {
                  some: {
                    positionConfig: {
                      axle: {
                        equipmentId,
                      },
                    },
                  },
                },
              },
            }
          : {}),
      },
      include: {
        tire: {
          include: {
            model: true,
          },
        },
      },
    });

    // Procesamiento de datos para el reporte
    const equipmentUsage = this.processEquipmentUsage(assignments, rotations);
    const tireUsage = this.processTireUsage(
      assignments,
      rotations,
      inspections
    );

    return {
      period: {
        startDate,
        endDate,
      },
      equipmentUsage,
      tireUsage,
      summary: {
        totalAssignments: assignments.length,
        totalRotations: rotations.length,
        totalInspections: inspections.length,
      },
    };
  }

  private processEquipmentUsage(assignments, rotations) {
    // Agrupar por equipo
    const equipmentMap = new Map();

    // Procesar asignaciones
    assignments.forEach((assignment) => {
      if (!assignment.positionConfig?.axle?.equipment) return;

      const equipment = assignment.positionConfig.axle.equipment;
      const equipmentId = equipment.id;

      if (!equipmentMap.has(equipmentId)) {
        equipmentMap.set(equipmentId, {
          id: equipmentId,
          name: equipment.name || "Sin nombre",
          code: equipment.code || "Sin código",
          assignments: [],
          rotations: [],
        });
      }

      equipmentMap.get(equipmentId).assignments.push(assignment);
    });

    // Procesar rotaciones
    rotations.forEach((rotation) => {
      // Equipo de origen
      if (rotation.fromEquipmentId) {
        // Para simplificar, no incluimos equipos en rotaciones ya que no tenemos la relación directa
        // Las rotaciones ahora usan fromEquipmentId/toEquipmentId pero no tenemos include
      }

      // Equipo de destino
      if (rotation.toEquipmentId) {
        // Similar al origen
      }
    });

    return Array.from(equipmentMap.values());
  }

  private processTireUsage(assignments, rotations, inspections) {
    // Agrupar por neumático
    const tireMap = new Map();

    // Procesar asignaciones
    assignments.forEach((assignment) => {
      if (!assignment.tire) return;

      const tire = assignment.tire;
      const tireId = tire.id;

      if (!tireMap.has(tireId)) {
        tireMap.set(tireId, {
          id: tireId,
          serialNumber: tire.serialNumber || "Sin número de serie",
          model: tire.model?.name || "Sin modelo",
          brand: tire.model?.brand || "Sin marca",
          status: tire.status || "UNKNOWN",
          assignments: [],
          rotations: [],
          inspections: [],
        });
      }

      tireMap.get(tireId).assignments.push({
        ...assignment,
        equipment: assignment.positionConfig?.axle?.equipment || null,
        position: assignment.positionConfig?.positionKey || null,
      });
    });

    // Procesar rotaciones
    rotations.forEach((rotation) => {
      if (!rotation.tire) return;

      const tire = rotation.tire;
      const tireId = tire.id;

      if (!tireMap.has(tireId)) {
        tireMap.set(tireId, {
          id: tireId,
          serialNumber: tire.serialNumber || "Sin número de serie",
          model: tire.model?.name || "Sin modelo",
          brand: tire.model?.brand || "Sin marca",
          status: tire.status || "UNKNOWN",
          assignments: [],
          rotations: [],
          inspections: [],
        });
      }

      tireMap.get(tireId).rotations.push({
        ...rotation,
        equipment: null, // Rotations no longer have direct equipment relation
      });
    });

    // Procesar inspecciones
    inspections.forEach((inspection) => {
      if (!inspection.tire) return;

      const tire = inspection.tire;
      const tireId = tire.id;

      if (!tireMap.has(tireId)) {
        tireMap.set(tireId, {
          id: tireId,
          serialNumber: tire.serialNumber || "Sin número de serie",
          model: tire.model?.name || "Sin modelo",
          brand: tire.model?.brand || "Sin marca",
          status: tire.status || "UNKNOWN",
          assignments: [],
          rotations: [],
          inspections: [],
        });
      }

      tireMap.get(tireId).inspections.push(inspection);
    });

    return Array.from(tireMap.values());
  }
}
