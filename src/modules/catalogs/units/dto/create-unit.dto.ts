import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateUnitDto {
  @Field()
  @ApiProperty({
    description: "Name of the unit",
    example: "Kilogram",
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field()
  @ApiProperty({
    description: "Abbreviation for the unit",
    example: "kg",
  })
  @IsString()
  @IsNotEmpty()
  abbreviation!: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    description: "Whether the unit is active",
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
