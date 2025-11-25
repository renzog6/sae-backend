//filepath: sae-backend/src/common/utils/date.util.ts
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatDate = (value: Date | string): string => {
  if (!value) return "";
  return format(new Date(value), "dd/MM/yyyy HH:mm", { locale: es });
};

export const formatDateOnly = (value: Date | string): string => {
  if (!value) return "";
  return format(new Date(value), "dd/MM/yyyy", { locale: es });
};

/**
 * Calculates the tenure (years and months) from a start date to the current date.
 *
 * @param start - The start date as a Date object or string
 * @returns A string representing years and months in "years,months" format (e.g., "5,8" for 5 years and 8 months)
 *
 * @example
 * ```typescript
 * calculateTenure('2020-01-15') // Returns "5,8" for 5 years and 8 months from 2025
 * calculateTenure(new Date('2020-01-15')) // Same result
 * ```
 */
export const calculateTenure = (start: Date | string): string => {
  const startDate = new Date(start);
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  //Años ,  Meses
  return `${years},${months}`;
};
