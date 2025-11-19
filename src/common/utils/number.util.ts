//filepath: sae-backend/src/common/utils/number.util.ts

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(value);

export const formatNumber = (value: number): string =>
  new Intl.NumberFormat("es-AR").format(value);
