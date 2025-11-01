//file: sae-backend/src/tires/tire-recaps/dto/create-tire-recap.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from "class-validator";

export class CreateTireRecapDto {
  @ApiProperty({ example: 1, description: "Tire ID to recap" })
  @IsInt()
  tireId: number;

  @ApiProperty({ example: "Vulcanizadora RCM", required: false })
  @IsOptional()
  @IsString()
  provider?: string;

  @ApiProperty({
    example: "Recap inicial después de 60.000 km",
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    example: 85000.5,
    description: "Costo del recapado en pesos",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  cost?: number;

  @ApiProperty({
    example: 60000,
    description: "Kilómetros acumulados al momento del recapado",
    required: false,
  })
  @IsOptional()
  @IsInt()
  kmAtRecap?: number;

  @ApiProperty({
    example: "full",
    description: "Tipo de recapado (full, partial, delamination_repair)",
    required: false,
  })
  @IsOptional()
  @IsString()
  recapType?: string;
}
