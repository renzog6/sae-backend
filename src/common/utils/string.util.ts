//filepath: sae-backend/src/common/utils/string.util.ts

export const formatEmployeeName = (
  firstName: string,
  lastName: string
): string => {
  return `${lastName}, ${firstName}`;
};

export const capitalize = (value: string): string => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};
