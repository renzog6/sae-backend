// filepath: sae-backend/src/common/logger/logger.middleware.ts
import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger("HTTP");

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const correlationId =
      req.headers["x-correlation-id"]?.toString() ?? randomUUID();
    res.setHeader("x-correlation-id", correlationId);

    this.logger.debug(
      `Incoming request: ${req.method} ${req.baseUrl + req.path} [CID=${correlationId}]`
    );

    res.on("finish", () => {
      const duration = Date.now() - start;
      const status = res.statusCode;

      const level = status >= 500 ? "error" : status >= 400 ? "warn" : "log";

      const message = {
        method: req.method,
        path: req.baseUrl + req.path,
        status,
        duration,
        cid: correlationId,
        ip: req.ip,
      };

      this.logger[level](JSON.stringify(message));
    });

    next();
  }
}
