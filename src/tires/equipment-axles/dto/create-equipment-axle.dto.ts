// filepath: sae-backend/src/tires/equipment-axles/dto/create-equipment-axle.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AxleType } from "@prisma/client";

export class CreateEquipmentAxleDto {
  @ApiProperty({ example: 1, description: "Equipment ID" })
  @IsInt()
  equipmentId: number;

  @ApiProperty({ example: 1, description: "Order number (1 for first axle, etc.)" })
  @IsInt()
  order: number;

  @ApiProperty({ 
    enum: AxleType, 
    example: "DRIVE", 
    description: "Type of axle (FRONT, DRIVE, TRAILER, TAG)" 
  })
  @IsEnum(AxleType)
  axleType: AxleType;

  @ApiProperty({ 
    example: 4, 
    description: "Number of wheels on this axle" 
  })
  @IsInt()
  wheelCount: number;

  @ApiProperty({ 
    example: "Front steering axle", 
    description: "Optional description",
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;
}