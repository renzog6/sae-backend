// filepath: sae-backend/src/common/decorators/roles.decorator.ts
import { SetMetadata } from "@nestjs/common";
import { Role } from "@prisma/client";

/**
 * Única fuente de verdad de los roles: el enum de Prisma.
 *
 * Antes había un enum local que además declaraba MANAGER y EMPLOYEE, valores que
 * la base nunca puede contener (`enum Role { USER, ADMIN }`). Eso generaba
 * `@Roles(Role.ADMIN)` en 11 lugares que en la práctica eran
 * sólo-ADMIN, sin que nada lo advirtiera: autorizaba de menos, en silencio.
 *
 * Reexportarlo desde Prisma hace que referenciar un rol inexistente sea un error
 * de compilación en lugar de un bug silencioso.
 */
export { Role };

export const ROLES_KEY = "roles";
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
