// filepath: sae-backend/src/modules/tires/tire-positions/dto/create-tire-position.dto.ts
import { InputType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsInt, IsString } from "class-validator";
import { TireSide } from "@prisma/client";

@InputType()
export class CreateTirePositionDto {
  @Field(() => Int)
  @ApiProperty({ example: 1, description: "Axle ID" })
  @IsInt()
  axleId: number;

  @Field(() => String)
  @ApiProperty({ example: "E1I", description: "Position key (e.g., E1I, E1D)" })
  @IsString()
  positionKey: string;

  @Field(() => TireSide)
  @ApiProperty({
    enum: TireSide,
    example: "LEFT",
    description: "Side of the tire (LEFT, RIGHT, INNER, OUTER)",
  })
  @IsEnum(TireSide)
  side: TireSide;

  @Field(() => Boolean)
  @ApiProperty({
    example: false,
    description: "Whether this position is for dual tires",
  })
  @IsBoolean()
  isDual: boolean;
}
