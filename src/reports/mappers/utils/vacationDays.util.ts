/**
 * Calculates available vacation days as assigned days minus taken days.
 * @param vacations Array of employee vacation records
 * @returns The number of available vacation days
 */
export function calculateAvailableVacationDays(vacations: any[]): number {
  let assignedDays = 0;
  let takenDays = 0;

  for (const vacation of vacations) {
    const days = Number(vacation?.days ?? 0);
    if (vacation?.type === "ASSIGNED") {
      assignedDays += days;
    } else if (vacation?.type === "TAKEN") {
      takenDays += days;
    }
  }

  return Math.max(0, assignedDays - takenDays); // Ensure non-negative result
}
