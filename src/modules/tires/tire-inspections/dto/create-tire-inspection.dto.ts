import { InputType, Field, Int, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsDate, IsNumber } from "class-validator";
import { Type } from "class-transformer";

@InputType()
export class CreateTireInspectionDto {
  @Field(() => Int)
  @ApiProperty({ example: 1, description: "Tire ID to inspect" })
  @IsInt()
  tireId: number;

  @Field({ nullable: true })
  @ApiProperty({
    example: "2024-01-15T10:00:00Z",
    description: "Inspection date",
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  inspectionDate?: Date;

  @Field(() => Float, { nullable: true })
  @ApiProperty({
    example: 32.5,
    description: "Tire pressure in PSI",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  pressure?: number;

  @Field(() => Float, { nullable: true })
  @ApiProperty({
    example: 8.5,
    description: "Tread depth in mm",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  treadDepth?: number;

  @Field({ nullable: true })
  @ApiProperty({
    example: "Good condition",
    description: "Inspection observation",
    required: false,
  })
  @IsOptional()
  @IsString()
  observation?: string;
}
