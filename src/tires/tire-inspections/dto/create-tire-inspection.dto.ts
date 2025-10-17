//filepath: sae-backend/src/tires/tire-inspections/dto/create-tire-inspection.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsDate, IsNumber } from "class-validator";

export class CreateTireInspectionDto {
  @ApiProperty({ example: 1, description: "Tire ID to inspect" })
  @IsInt()
  tireId: number;

  @ApiProperty({
    example: "2024-01-15T10:00:00Z",
    description: "Inspection date",
    required: false,
  })
  @IsOptional()
  @IsDate()
  inspectionDate?: Date;

  @ApiProperty({
    example: 32.5,
    description: "Tire pressure in PSI",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  pressure?: number;

  @ApiProperty({
    example: 8.5,
    description: "Tread depth in mm",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  treadDepth?: number;

  @ApiProperty({
    example: "Good condition",
    description: "Inspection observation",
    required: false,
  })
  @IsOptional()
  @IsString()
  observation?: string;
}
