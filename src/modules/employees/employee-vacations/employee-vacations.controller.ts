import { BaseController } from "@common/controllers/base.controller";
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { Response } from "express";
import { EmployeeVacationsService } from "./employee-vacations.service";
import { CreateEmployeeVacationDto } from "./dto/create-employee-vacation.dto";
import { EmployeeVacation } from "./entities/employee-vacation.entity";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("employee-vacations")
@Controller("employee-vacations")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EmployeeVacationsController extends BaseController<EmployeeVacation> {
  constructor(private readonly vacationsService: EmployeeVacationsService) {
    super(vacationsService, EmployeeVacation, "EmployeeVacation");
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Create a new vacation record",
    description: "Creates a new vacation record for an employee",
  })
  @ApiBody({ type: CreateEmployeeVacationDto })
  @ApiResponse({
    status: 201,
    description: "Vacation record created successfully",
  })
  override create(@Body() dto: CreateEmployeeVacationDto) {
    return this.vacationsService.create(dto);
  }

  @Get(":id/pdf")
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({
    summary: "Generate PDF for vacation request",
    description: "Generates a PDF document for signing the vacation request",
  })
  @ApiParam({ name: "id", type: "number" })
  @ApiResponse({ status: 200, description: "PDF generated successfully" })
  async generatePdf(@Param("id", ParseIntPipe) id: number, @Res() res: Response) {
    const buffer = await this.vacationsService.generateVacationPdf(id);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=vacaciones_${id}.pdf`,
      "Content-Length": buffer.length,
    });

    res.end(buffer);
  }
}
