// filepath: sae-backend/src/modules/employees/employee-vacations/dto/create-employee-vacation.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { VacationType } from "@prisma/client";

export class CreateEmployeeVacationDto {
  constructor(dto?: any) {
    if (dto) {
      Object.assign(this, dto);
    }
  }

  @ApiProperty({
    description: "Detalle adicional sobre la vacación",
    required: false,
  })
  @IsOptional()
  @IsString()
  detail?: string;

  @ApiProperty({ description: "Cantidad de días de la vacación", example: 14 })
  @IsInt()
  @Min(1)
  days: number;

  @ApiProperty({
    description:
      "Año al que corresponde la vacación (si no se envía se calcula desde startDate)",
    required: false,
    example: 2025,
  })
  @IsOptional()
  @IsInt()
  year?: number;

  @ApiProperty({
    description: "Fecha de inicio de la vacación en formato ISO",
    example: "2025-10-01T00:00:00.000Z",
  })
  @IsString()
  startDate: string;

  @ApiProperty({
    description:
      "Tipo de vacación (ASSIGNED = días acreditados, TAKEN = días tomados)",
    enum: VacationType,
    required: false,
    example: VacationType.TAKEN,
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({
    description:
      "Fecha de liquidación en formato ISO (opcional, por defecto ahora)",
    example: "2025-10-01T00:00:00.000Z",
    required: false,
  })
  @IsOptional()
  @IsString()
  settlementDate?: string;

  @ApiProperty({ description: "ID del empleado asociado", example: 1 })
  @IsInt()
  employeeId!: number;
}
