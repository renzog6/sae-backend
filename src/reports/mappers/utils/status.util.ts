// filepath: sae-backend/src/reports/mappers/utils/status.util.ts
import { EquipmentStatus, TireStatus } from "@prisma/client";

/**
 * Utility function to map employee status codes to human-readable strings.
 * @param status Employee status code
 * @returns Mapped status string
 */

export function mapEmployeeStatus(status: string): string {
  const statusMap: Record<string, string> = {
    active: "ACTIVE",
    inactive: "INACTIVE",
    suspended: "SUSPENDED",
    terminated: "TERMINATED",
  };
  return statusMap[status.toLowerCase()] || status.toUpperCase();
}

/**
 * Utility function to map equipment status strings to EquipmentStatus enum.
 * @param status Equipment status string
 * @returns EquipmentStatus enum value
 */
export function mapEquipmentStatus(status: string): EquipmentStatus {
  const statusMap: Record<string, EquipmentStatus> = {
    active: EquipmentStatus.ACTIVE,
    inactive: EquipmentStatus.INACTIVE,
    maintenance: EquipmentStatus.MAINTENANCE,
    retired: EquipmentStatus.RETIRED,
  };
  return statusMap[status.toLowerCase()] || EquipmentStatus.ACTIVE; // default to ACTIVE if unknown
}

/**
 * Utility function to map tire status strings to TireStatus enum.
 * @param status Tire status string
 * @returns TireStatus enum value
 */
export function mapTireStatus(status: string): TireStatus {
  const statusMap: Record<string, TireStatus> = {
    active: TireStatus.IN_STOCK,
    in_stock: TireStatus.IN_STOCK,
    in_use: TireStatus.IN_USE,
    under_repair: TireStatus.UNDER_REPAIR,
    recap: TireStatus.RECAP,
    discarded: TireStatus.DISCARDED,
  };
  return statusMap[status.toLowerCase()] || TireStatus.IN_STOCK; // default to IN_STOCK if unknown
}
