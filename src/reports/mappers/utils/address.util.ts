// filepath: sae-backend/src/reports/mappers/utils/address.util.ts
/**
 * Utility function to format an address object into a human-readable string.
 * @param address Address object
 * @returns Formatted address string
 */
export function formatAddress(address: any): string {
  if (!address) return "N/A";

  const street = address.street ?? "";
  const number = address.number ? ` ${address.number}` : "";
  const city = address.city?.name ?? "";
  const postalCode = address.city?.postalCode
    ? ` (${address.city.postalCode})`
    : "";
  const province = address.city?.province?.name ?? "";

  return `${street}${number} - ${city}${postalCode} - ${province}`.trim();
}
