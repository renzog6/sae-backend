import { InputType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber, IsInt } from "class-validator";

@InputType()
export class CreateTireModelDto {
  @Field(() => Int)
  @ApiProperty({
    example: 1,
    description: "Brand ID (foreign key)",
  })
  @IsInt()
  brandId: number;

  @Field(() => Int)
  @ApiProperty({
    example: 1,
    description: "Tire size ID (foreign key)",
  })
  @IsInt()
  sizeId: number;

  @Field()
  @ApiProperty({
    example: "Agribib",
    description: "Model name",
  })
  @IsString()
  name: string;

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
    example: "8PR",
    description: "Ply rating",
    required: false,
  })
  @IsOptional()
  @IsString()
  plyRating?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "R-1W",
    description: "Tread pattern",
    required: false,
  })
  @IsOptional()
  @IsString()
  treadPattern?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "Neumático agrícola de alto rendimiento",
    description: "Additional information",
    required: false,
  })
  @IsOptional()
  @IsString()
  information?: string;
}
