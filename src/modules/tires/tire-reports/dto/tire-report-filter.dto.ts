//filepath: sae-backend/src/tires/tire-reports/dto/tire-reports-filters.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsDateString, IsNumber } from "class-validator";

export class TireReportFilterDto {
  @ApiProperty({
    required: false,
    description: "Filtrar por marca (Brand name)",
  })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({
    required: false,
    description: "Filtrar por rango de fechas desde",
  })
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiProperty({
    required: false,
    description: "Filtrar por rango de fechas hasta",
  })
  @IsOptional()
  @IsDateString()
  toDate?: string;

  @ApiProperty({
    required: false,
    description: "Filtrar por mínimo de kilómetros acumulados",
  })
  @IsOptional()
  @IsNumber()
  minKm?: number;
}
