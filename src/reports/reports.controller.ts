// filepath: src/reports/reports.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ReportsService } from "./services/reports.service";
import { GenerateReportDto } from "./dto/generate-report.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiConsumes,
  ApiProduces,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("reports")
@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post("generate")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Generate a report (Excel or PDF)" })
  @ApiConsumes("application/json")
  @ApiProduces("application/octet-stream", "application/pdf", "text/csv")
  @ApiBody({
    description: "Report generation parameters",
    type: GenerateReportDto,
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "Binary file buffer (as attachment).",
  })
  @ApiBadRequestResponse({ description: "Invalid request parameters" })
  async generate(@Body() dto: GenerateReportDto) {
    // The controller returns a Buffer; the framework will send proper Content-Type if you set headers.
    // Usually you'd stream the buffer with appropriate headers; keep this method as thin orchestration.
    return this.reportsService.generateReport(dto);
  }

  @Post("preview")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Generate a preview of the report (JSON)" })
  @ApiResponse({
    status: 200,
    description: "Preview JSON with sample data and metadata",
  })
  @ApiBadRequestResponse({ description: "Invalid request parameters" })
  async preview(@Body() dto: GenerateReportDto) {
    return this.reportsService.generateReportPreview(dto);
  }
}
