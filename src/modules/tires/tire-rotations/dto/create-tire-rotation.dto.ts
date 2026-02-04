import { InputType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsDate, IsEnum, IsString } from "class-validator";
import { TirePosition } from "@prisma/client";
import { Type } from "class-transformer";

@InputType()
export class CreateTireRotationDto {
  @Field(() => Int)
  @ApiProperty({ example: 1, description: "Tire ID to rotate" })
  @IsInt()
  tireId: number;

  @Field(() => Int, { nullable: true })
  @ApiProperty({
    example: 123,
    description: "From equipment ID",
    required: false,
  })
  @IsOptional()
  @IsInt()
  fromEquipmentId?: number;

  @Field(() => Int, { nullable: true })
  @ApiProperty({
    example: 456,
    description: "To equipment ID",
    required: false,
  })
  @IsOptional()
  @IsInt()
  toEquipmentId?: number;

  @Field(() => TirePosition, { nullable: true })
  @ApiProperty({
    enum: TirePosition,
    description: "From position",
    required: false,
  })
  @IsOptional()
  @IsEnum(TirePosition)
  fromPosition?: TirePosition;

  @Field(() => TirePosition, { nullable: true })
  @ApiProperty({
    enum: TirePosition,
    description: "To position",
    required: false,
  })
  @IsOptional()
  @IsEnum(TirePosition)
  toPosition?: TirePosition;

  @Field({ nullable: true })
  @ApiProperty({
    example: "2024-01-15T10:00:00Z",
    description: "Rotation date",
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  rotationDate?: Date;

  @Field(() => Int, { nullable: true })
  @ApiProperty({
    example: 150000,
    description: "KM at rotation time",
    required: false,
  })
  @IsOptional()
  @IsInt()
  kmAtRotation?: number;

  @Field({ nullable: true })
  @ApiProperty({ example: "Regular maintenance rotation", required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
