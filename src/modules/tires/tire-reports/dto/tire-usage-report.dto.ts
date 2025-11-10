// filepath: sae-backend/src/modules/tires/tire-reports/dto/tire-usage-report.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class TireUsageReportDto {
  @ApiProperty({
    example: "2023-01-01",
    description: "Fecha de inicio del reporte",
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    example: "2023-12-31",
    description: "Fecha de fin del reporte",
  })
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @ApiProperty({
    example: 1,
    description: "ID del equipo (opcional, si se omite se incluyen todos)",
    required: false,
  })
  @IsOptional()
  @IsInt()
  equipmentId?: number;
}
