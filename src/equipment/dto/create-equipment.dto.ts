import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { EquipmentStatus } from "@prisma/client";

export class CreateEquipmentDto {
  @ApiPropertyOptional({ description: "Internal equipment code" })
  @IsString()
  @IsOptional()
  internalCode?: string;

  @ApiPropertyOptional({ description: "Equipment name" })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: "Equipment description" })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: "Equipment observation" })
  @IsString()
  @IsOptional()
  observation?: string;

  @ApiPropertyOptional({ description: "Equipment year" })
  @IsNumber()
  @IsOptional()
  year?: number;

  @ApiPropertyOptional({ description: "Equipment license plate" })
  @IsString()
  @IsOptional()
  licensePlate?: string;

  @ApiPropertyOptional({ description: "Equipment chassis number" })
  @IsString()
  @IsOptional()
  chassis?: string;

  @ApiPropertyOptional({ description: "Equipment engine number" })
  @IsString()
  @IsOptional()
  engine?: string;

  @ApiPropertyOptional({ description: "Equipment color" })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({ description: "Whether the equipment uses diesel" })
  @IsBoolean()
  @IsOptional()
  diesel?: boolean;

  @ApiPropertyOptional({
    description: "Equipment status",
    enum: EquipmentStatus,
    default: EquipmentStatus.ACTIVE,
  })
  @IsEnum(EquipmentStatus)
  @IsOptional()
  status?: EquipmentStatus;

  @ApiPropertyOptional({ description: "Company ID" })
  @IsNumber()
  @IsOptional()
  companyId?: number;

  @ApiPropertyOptional({ description: "Equipment category ID" })
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @ApiPropertyOptional({ description: "Equipment type ID" })
  @IsNumber()
  @IsOptional()
  typeId?: number;

  @ApiPropertyOptional({ description: "Equipment model ID" })
  @IsNumber()
  @IsOptional()
  modelId?: number;
}
