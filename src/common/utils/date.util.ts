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

export const calculateTenure = (start: Date | string): string => {
  const startDate = new Date(start);
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  //return `${years} years ${months} months`;

  //Solo numeros
  return `${years},${months}`;
};
