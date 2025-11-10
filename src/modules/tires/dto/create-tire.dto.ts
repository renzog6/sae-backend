// filepath: sae-backend/src/modules/tires/dto/create-tire.dto.ts
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
    description: "Tire model ID (foreign key)",
  })
  @IsInt()
  modelId: number;

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
