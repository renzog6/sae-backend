// filepath: sae-backend/src/common/exceptions/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const error = exception.getResponse();
    const message =
      typeof error === "string" ? error : error["message"] || exception.message;

    const errorResponse: any = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      error,
    };

    // Agregar stack solo en desarrollo
    if (
      process.env.NODE_ENV !== "production" &&
      status === HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      errorResponse.stack = exception.stack;
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${request.method} ${request.url}`,
        exception.stack,
        "HttpExceptionFilter"
      );
    } else {
      this.logger.warn(
        `${request.method} ${request.url} - Status ${status}`,
        JSON.stringify(errorResponse)
      );
    }

    response.status(status).json(errorResponse);
  }
}
