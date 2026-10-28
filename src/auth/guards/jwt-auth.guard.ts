// filepath: sae-backend/src/auth/guards/jwt-auth.guard.ts
import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Escape hatch exclusivo de la suite de tests: permite que las suites que no
    // ejercitan autenticación no tengan que emitir tokens. Sólo se activa con
    // NODE_ENV=test, así que no puede dispararse en producción.
    if (process.env.NODE_ENV === "test" && process.env.AUTH_BYPASS === "true") {
      return true;
    }

    // Check if the route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // If not public, proceed with JWT authentication
    return super.canActivate(context);
  }
}
