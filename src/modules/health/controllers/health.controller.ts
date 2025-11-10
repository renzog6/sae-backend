import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Public } from "@auth/decorators/public.decorator";

export interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
  version: string;
}

@ApiTags("Health")
@Controller("health")
export class HealthController {
  @Get()
  @Public()
  @ApiOperation({ summary: "Health check endpoint" })
  @ApiResponse({
    status: 200,
    description: "Service is healthy",
    schema: {
      type: "object",
      properties: {
        status: { type: "string", example: "ok" },
        timestamp: { type: "string", example: "2024-01-01T00:00:00.000Z" },
        service: { type: "string", example: "SAE Backend API" },
        version: { type: "string", example: "1.0.0" },
      },
    },
  })
  check(): HealthResponse {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "SAE Backend API",
      version: "1.0.0",
    };
  }
}
