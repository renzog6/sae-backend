//filepath: sae-backend/src/tires/tire-rotations/dto/create-tire-rotation.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsDate, IsEnum, IsString } from "class-validator";
import { TirePosition } from "@prisma/client";

export class CreateTireRotationDto {
  @ApiProperty({ example: 1, description: "Tire ID to rotate" })
  @IsInt()
  tireId: number;

  @ApiProperty({
    example: 123,
    description: "From equipment ID",
    required: false,
  })
  @IsOptional()
  @IsInt()
  fromEquipmentId?: number;

  @ApiProperty({
    example: 456,
    description: "To equipment ID",
    required: false,
  })
  @IsOptional()
  @IsInt()
  toEquipmentId?: number;

  @ApiProperty({
    enum: TirePosition,
    description: "From position",
    required: false,
  })
  @IsOptional()
  @IsEnum(TirePosition)
  fromPosition?: TirePosition;

  @ApiProperty({
    enum: TirePosition,
    description: "To position",
    required: false,
  })
  @IsOptional()
  @IsEnum(TirePosition)
  toPosition?: TirePosition;

  @ApiProperty({
    example: "2024-01-15T10:00:00Z",
    description: "Rotation date",
    required: false,
  })
  @IsOptional()
  @IsDate()
  rotationDate?: Date;

  @ApiProperty({
    example: 150000,
    description: "KM at rotation time",
    required: false,
  })
  @IsOptional()
  @IsInt()
  kmAtRotation?: number;

  @ApiProperty({ example: "Regular maintenance rotation", required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
