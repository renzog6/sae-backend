// filepath: sae-backend/src/modules/validators/validators.config.ts
import { Prisma } from "@prisma/client";

export const UNIQUE_VALIDATORS: Partial<
  Record<Prisma.ModelName, readonly string[]>
> = {
  Equipment: ["engine", "internalCode", "licensePlate", "chassis"],
  Company: ["cuit", "name"],
  Employee: ["document"],
  Brand: ["name"],
  // agregás más sin tocar lógica
} as const;
