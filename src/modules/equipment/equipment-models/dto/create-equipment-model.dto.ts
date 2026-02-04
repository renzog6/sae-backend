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
export class CreateEquipmentModelDto {
  @Field()
  @ApiProperty({ description: "Model name" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  name: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ description: "Model code" })
  @IsString()
  @IsOptional()
  code?: string;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ description: "Model year" })
  @IsNumber()
  @IsOptional()
  year?: number;

  @Field({ nullable: true })
  @ApiPropertyOptional({ description: "Model description" })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ description: "Type ID" })
  @IsNumber()
  @IsOptional()
  typeId?: number;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ description: "Brand ID" })
  @IsNumber()
  @IsOptional()
  brandId?: number;
}
