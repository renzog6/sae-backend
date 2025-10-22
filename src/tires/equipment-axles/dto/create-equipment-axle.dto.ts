// filepath: sae-backend/src/tires/equipment-axles/dto/create-equipment-axle.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from "class-validator";
import { Type } from "class-transformer";
import { AxleType } from "@prisma/client";
import { CreateTirePositionDto } from "../../tire-positions/dto/create-tire-position.dto";

export class CreateEquipmentAxleDto {
  @ApiProperty({ example: 1, description: "Equipment ID" })
  @IsInt()
  equipmentId: number;

  @ApiProperty({
    example: 1,
    description: "Order number (1 for first axle, etc.)",
  })
  @IsInt()
  order: number;

  @ApiProperty({
    enum: AxleType,
    example: "DRIVE",
    description: "Type of axle (FRONT, DRIVE, TRAILER, TAG)",
  })
  @IsEnum(AxleType)
  axleType: AxleType;

  @ApiProperty({
    example: 4,
    description: "Number of wheels on this axle",
  })
  @IsInt()
  wheelCount: number;

  @ApiProperty({
    example: "Front steering axle",
    description: "Optional description",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateEquipmentAxleWithPositionsDto {
  @ApiProperty({ type: CreateEquipmentAxleDto })
  @ValidateNested()
  @Type(() => CreateEquipmentAxleDto)
  axle: CreateEquipmentAxleDto;

  @ApiProperty({
    type: [CreateTirePositionDto],
    description: "Array of tire positions to create for this axle",
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTirePositionDto)
  positions: CreateTirePositionDto[];
}
