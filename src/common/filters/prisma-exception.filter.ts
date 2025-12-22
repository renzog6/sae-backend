// filepath: sae-backend/src/common/filters/prisma-exception.filter.ts
import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "@prisma/client";
import { Response } from "express";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Error interno del servidor";
    let errorDetails: any = null;

    // Manejar errores de Prisma
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case "P2002":
          status = HttpStatus.CONFLICT;
          const field = exception.meta?.target?.[0];
          message = `Ya existe un registro con este ${field}`;
          errorDetails = { field, code: "DUPLICATE_ENTRY" };
          break;

        case "P2003":
          status = HttpStatus.BAD_REQUEST;
          message = "Error de referencia a registro no encontrado";
          break;

        case "P2025":
          status = HttpStatus.NOT_FOUND;
          message = "Registro no encontrado";
          break;

        default:
          console.error("Prisma error:", exception);
          message = "Error en la base de datos";
      }
    }
    // Manejar excepciones HTTP de NestJS
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      errorDetails = exception.getResponse();
    }
    // Loggear errores desconocidos
    else {
      console.error("Unhandled error:", exception);
    }

    // Responder con formato consistente
    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      ...(errorDetails && { details: errorDetails }),
    });
  }
}
