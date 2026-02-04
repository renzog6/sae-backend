//filepath: sae-backend/src/common/utils/date.util.ts
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatDate = (value: Date | string): string => {
  if (!value) return "";
  return format(new Date(value), "dd/MM/yyyy HH:mm", { locale: es });
};

export const formatDateOnly = (value: Date | string): string => {
  if (!value) return "";
  const date = new Date(value);
  // Usar métodos UTC para evitar shifts de zona horaria
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Calculates the tenure (years and months) from a start date to an end date (or current date).
 *
 * @param start - The start date as a Date object or string
 * @param end - Optional end date as a Date object or string (defaults to current date)
 * @returns A string representing years and months in "years,months" format (e.g., "5,8" for 5 years and 8 months)
 */
export const calculateTenure = (start: Date | string, end?: Date | string): string => {
  if (!start) return "0,0";
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  if (isNaN(startDate.getTime())) return "0,0";

  let totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  // Ajuste si el día actual es menor que el día de ingreso
  if (endDate.getDate() < startDate.getDate()) totalMonths--;

  // Nunca devolver valores negativos
  totalMonths = Math.max(totalMonths, 0);

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return `${years},${months}`;
};
