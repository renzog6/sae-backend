// filepath: sae-backend/src/modules/equipment/dto/create-equipment-axle.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
  IsBoolean,
} from "class-validator";
import { Type } from "class-transformer";
import { AxleType, TireSide } from "@prisma/client";

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

export class CreateTirePositionDto {
  @ApiProperty({ example: "E1I", description: "Position key (e.g., E1I, E1D)" })
  @IsString()
  positionKey: string;

  @ApiProperty({
    enum: TireSide,
    example: "LEFT",
    description: "Side of the tire (LEFT, RIGHT, INNER, OUTER)",
  })
  @IsEnum(TireSide)
  side: TireSide;

  @ApiProperty({
    example: false,
    description: "Whether this position is for dual tires",
  })
  @IsBoolean()
  isDual: boolean;
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
