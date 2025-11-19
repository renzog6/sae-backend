// filepath: sae-backend/src/modules/employees/employee-vacations/employee-vacations.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { BaseQueryDto } from "@common/dto/base-query.dto";
import { EmployeeVacationsService } from "./employee-vacations.service";
import { CreateEmployeeVacationDto } from "./dto/create-employee-vacation.dto";
import { UpdateEmployeeVacationDto } from "./dto/update-employee-vacation.dto";

@ApiTags("employee-vacations")
@Controller("employee-vacations")
export class EmployeeVacationsController {
  constructor(
    private readonly employeeVacationsService: EmployeeVacationsService
  ) {}

  @Post()
  create(@Body() createEmployeeVacationDto: CreateEmployeeVacationDto) {
    return this.employeeVacationsService.create(createEmployeeVacationDto);
  }

  @Get()
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "q", required: false, type: String })
  @ApiQuery({ name: "sortBy", required: false, type: String })
  @ApiQuery({ name: "sortOrder", required: false, type: String })
  findAll(@Query() query: BaseQueryDto) {
    return this.employeeVacationsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.employeeVacationsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEmployeeVacationDto: UpdateEmployeeVacationDto
  ) {
    return this.employeeVacationsService.update(+id, updateEmployeeVacationDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employeeVacationsService.remove(+id);
  }

  @Get(":id/pdf")
  async downloadPdf(@Param("id") id: string, @Res() res: Response) {
    const pdfBuffer = await this.employeeVacationsService.generateVacationPdf(
      Number(id)
    );
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="vacaciones_${id}.pdf"`
    );
    res.setHeader("Content-Length", pdfBuffer.length);
    res.end(pdfBuffer);
  }

  @Get(":employeeId/exportVacations/excel")
  async exportExcel(
    @Param("employeeId") employeeId: string,
    @Res() res: Response
  ) {
    const buffer = await this.employeeVacationsService.exportVacationsToExcel(
      Number(employeeId)
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="vacaciones.xlsx"`
    );
    res.setHeader("Content-Length", buffer.length);
    res.end(buffer);
  }

  @Get("exportEmployees/excel")
  async exportEmployeesExcel(@Res() res: Response) {
    const buffer =
      await this.employeeVacationsService.exportEmployeesVacationsToExcel();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="empleados_vacaciones.xlsx"`
    );
    res.setHeader("Content-Length", buffer.length);
    res.end(buffer);
  }
}
