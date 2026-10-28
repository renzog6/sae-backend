import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEnum,
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
  IsBoolean,
} from "class-validator";
import { MaintenanceType } from "@prisma/client";
import { Type } from "class-transformer";

export class CreateEquipmentMaintenanceDto {
  @ApiProperty({
    enum: MaintenanceType,
    description: "Type of maintenance performed",
    example: "PREVENTIVE",
  })
  @IsEnum(MaintenanceType)
  type: MaintenanceType;

  @ApiProperty({
    description: "Description of the maintenance work performed",
    example: "Changed oil and filters",
  })
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: "Cost of the maintenance work",
    example: 150.5,
  })
  @IsOptional()
  @IsNumber()
  cost?: number;

  @ApiProperty({
    description: "Start date of the maintenance in ISO format",
    example: "2025-10-01T00:00:00.000Z",
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiPropertyOptional({
    description: "End date of the maintenance in ISO format",
    example: "2025-10-01T12:00:00.000Z",
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @ApiPropertyOptional({
    description: "Name of the technician who performed the maintenance",
    example: "Juan Pérez",
  })
  @IsOptional()
  @IsString()
  technician?: string;

  @ApiPropertyOptional({
    description: "Whether the maintenance is covered by warranty",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  warranty?: boolean;

  @ApiProperty({
    description: "ID of the equipment being maintained",
    example: 1,
  })
  @IsNumber()
  equipmentId: number;
}
