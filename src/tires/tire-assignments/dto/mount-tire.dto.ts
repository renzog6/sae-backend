// filepath: sae-backend/src/tires/tire-assignments/dto/mount-tire.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class MountTireDto {
  @ApiProperty({ example: 1, description: "Tire id" })
  @IsInt()
  tireId: number;

  @ApiProperty({
    example: 123,
    description: "Equipment id where mount will happen",
  })
  @IsInt()
  equipmentId: number;

  @ApiProperty({ example: "E2I", description: "Position (enum TirePosition)" })
  @IsString()
  position: string;

  @ApiProperty({
    example: 150000,
    description: "KM odometer reading at mount time",
    required: false,
  })
  @IsOptional()
  @IsInt()
  kmAtStart?: number;

  @ApiProperty({ example: "Mount for seasonal campaign", required: false })
  @IsOptional()
  @IsString()
  note?: string;
}
