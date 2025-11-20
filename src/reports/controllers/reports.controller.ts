// filepath: sae-backend/src/reports/controllers/reports.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ReportsService } from "../services/reports.service";
import { GenerateReportDto } from "../dto/generate-report.dto";

@ApiTags("Reports")
@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post("generate")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Generate a report",
    description:
      "Generates a report in the specified format with optional filters",
  })
  @ApiResponse({
    status: 200,
    description: "Report file downloaded successfully",
  })
  @ApiResponse({
    status: 400,
    description: "Invalid request parameters",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error during report generation",
  })
  async generate(@Body() dto: GenerateReportDto, @Res() res: Response) {
    const result = await this.reportsService.generate(dto);

    res.setHeader("Content-Type", result.mimeType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${result.fileName}"`
    );
    res.send(result.buffer);
  }

  @Post("preview")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Preview report data",
    description:
      "Returns a preview of report data without generating the full file",
  })
  @ApiResponse({
    status: 200,
    description: "Report preview data",
    schema: {
      type: "object",
      properties: {
        title: { type: "string" },
        columns: { type: "array" },
        preview: { type: "array" },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Invalid request parameters",
  })
  async preview(@Body() dto: GenerateReportDto) {
    return this.reportsService.preview(dto);
  }
}
