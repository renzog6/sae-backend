// filepath: sae-backend/src/reports/mappers/utils/status.util.ts
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
