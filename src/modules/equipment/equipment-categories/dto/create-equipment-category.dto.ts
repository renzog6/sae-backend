import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

@InputType()
export class CreateEquipmentCategoryDto {
  @Field()
  @ApiProperty({ description: "Category name" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  name: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ description: "Category code" })
  @IsString()
  @IsOptional()
  code?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ description: "Category description" })
  @IsString()
  @IsOptional()
  description?: string;
}
