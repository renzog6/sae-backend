// filepath: sae-backend/src/modules/employees/employee-vacations/dto/update-employee-vacation.dto.ts
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PartialType } from "@nestjs/mapped-types";
import { CreateEmployeeVacationDto } from "./create-employee-vacation.dto";
import { VacationType } from "@prisma/client";
import { IsEnum } from "class-validator";

export class UpdateEmployeeVacationDto extends PartialType(
  CreateEmployeeVacationDto
) {
  @ApiPropertyOptional({ description: "Detalle adicional sobre la vacación" })
  detail?: string;

  @ApiPropertyOptional({
    description: "Cantidad de días de la vacación",
    example: 7,
  })
  days?: number;

  @ApiPropertyOptional({
    description: "Año al que corresponde la vacación",
    example: 2025,
  })
  year?: number;

  @ApiPropertyOptional({
    description: "Fecha de inicio en formato ISO",
    example: "2025-12-15T00:00:00.000Z",
  })
  startDate?: string;

  @ApiPropertyOptional({
    description:
      "Tipo de vacación (ASSIGNED = días acreditados, TAKEN = días tomados)",
    enum: VacationType,
  })
  @IsEnum(VacationType)
  type?: VacationType;
}
