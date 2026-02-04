import { InputType, Field, Int, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber } from "class-validator";

@InputType()
export class CreateTireSizeDto {
  @Field()
  @ApiProperty({
    example: "380/90R46",
    description: "Main tire size code",
  })
  @IsString()
  mainCode: string;

  @Field(() => Int, { nullable: true })
  @ApiProperty({
    example: 380,
    description: "Width in mm",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  width?: number;

  @Field(() => Int, { nullable: true })
  @ApiProperty({
    example: 90,
    description: "Aspect ratio",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  aspectRatio?: number;

  @Field(() => Float, { nullable: true })
  @ApiProperty({
    example: 46,
    description: "Rim diameter in inches",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  rimDiameter?: number;

  @Field({ nullable: true })
  @ApiProperty({
    example: "R",
    description: "Construction type (R for Radial, D for Diagonal)",
    required: false,
  })
  @IsOptional()
  @IsString()
  construction?: string;

  @Field(() => Int, { nullable: true })
  @ApiProperty({
    example: 142,
    description: "Load index",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  loadIndex?: number;

  @Field({ nullable: true })
  @ApiProperty({
    example: "A8",
    description: "Speed symbol",
    required: false,
  })
  @IsOptional()
  @IsString()
  speedSymbol?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "Neumático agrícola radial de gran tamaño",
    description: "Additional information",
    required: false,
  })
  @IsOptional()
  @IsString()
  information?: string;
}
