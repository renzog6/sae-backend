import { InputType, Field, Int } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

@InputType()
export class CreateEquipmentTypeDto {
  @Field()
  @ApiProperty({ description: "Type name" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  name: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ description: "Type code" })
  @IsString()
  @IsOptional()
  code?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ description: "Type description" })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ description: "Category ID" })
  @IsNumber()
  @IsOptional()
  categoryId?: number;
}
