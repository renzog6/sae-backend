import { InputType, Field, Int, registerEnumType } from "@nestjs/graphql";
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

registerEnumType(TireSide, {
  name: "TireSide",
});

@InputType()
export class CreateEquipmentAxleDto {
  @Field(() => Int)
  @ApiProperty({ example: 1, description: "Equipment ID" })
  @IsInt()
  equipmentId: number;

  @Field(() => Int)
  @ApiProperty({
    example: 1,
    description: "Order number (1 for first axle, etc.)",
  })
  @IsInt()
  order: number;

  @Field(() => AxleType)
  @ApiProperty({
    enum: AxleType,
    example: "DRIVE",
    description: "Type of axle (FRONT, DRIVE, TRAILER, TAG)",
  })
  @IsEnum(AxleType)
  axleType: AxleType;

  @Field(() => Int)
  @ApiProperty({
    example: 4,
    description: "Number of wheels on this axle",
  })
  @IsInt()
  wheelCount: number;

  @Field({ nullable: true })
  @ApiProperty({
    example: "Front steering axle",
    description: "Optional description",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}

@InputType()
export class CreateTirePositionDto {
  @Field()
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

  @Field()
  @ApiProperty({
    example: false,
    description: "Whether this position is for dual tires",
  })
  @IsBoolean()
  isDual: boolean;
}

@InputType()
export class CreateEquipmentAxleWithPositionsDto {
  @Field(() => CreateEquipmentAxleDto)
  @ApiProperty({ type: CreateEquipmentAxleDto })
  @ValidateNested()
  @Type(() => CreateEquipmentAxleDto)
  axle: CreateEquipmentAxleDto;

  @Field(() => [CreateTirePositionDto])
  @ApiProperty({
    type: [CreateTirePositionDto],
    description: "Array of tire positions to create for this axle",
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTirePositionDto)
  positions: CreateTirePositionDto[];
}
