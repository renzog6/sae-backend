// filepath: sae-backend/src/tires/tire-positions/dto/create-tire-position.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsInt, IsString } from "class-validator";
import { TireSide } from "@prisma/client";

export class CreateTirePositionDto {
  @ApiProperty({ example: 1, description: "Axle ID" })
  @IsInt()
  axleId: number;

  @ApiProperty({ example: "E1I", description: "Position key (e.g., E1I, E1D)" })
  @IsString()
  positionKey: string;

  @ApiProperty({ 
    enum: TireSide, 
    example: "LEFT", 
    description: "Side of the tire (LEFT, RIGHT, INNER, OUTER)" 
  })
  @IsEnum(TireSide)
  side: TireSide;

  @ApiProperty({ 
    example: false, 
    description: "Whether this position is for dual tires" 
  })
  @IsBoolean()
  isDual: boolean;
}