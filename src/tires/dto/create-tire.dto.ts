//filepath: sae-backend/src/tires/dto/create-tire.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsEnum } from "class-validator";
import { TireStatus, TirePosition } from "@prisma/client";

export class CreateTireDto {
  @ApiProperty({
    example: "SN-0012456",
    description: "Unique serial number of the tire",
  })
  @IsString()
  serialNumber: string;

  @ApiProperty({
    example: 1,
    description: "Brand ID (foreign key)",
    required: false,
  })
  @IsOptional()
  @IsInt()
  brandId?: number;

  @ApiProperty({ example: 2, description: "Tire size ID", required: false })
  @IsOptional()
  @IsInt()
  sizeId?: number;

  @ApiProperty({
    example: "AGRIMAX RT 855",
    description: "Model or commercial name",
    required: false,
  })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({ enum: TirePosition, required: false })
  @IsOptional()
  @IsEnum(TirePosition)
  position?: TirePosition;

  @ApiProperty({ enum: TireStatus, default: TireStatus.IN_STOCK })
  @IsOptional()
  @IsEnum(TireStatus)
  status?: TireStatus;

  @ApiProperty({
    example: 0,
    description: "Total kilometers accumulated",
    required: false,
  })
  @IsOptional()
  @IsInt()
  totalKm?: number;
}
