import { InputType, Field, Int, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
} from "class-validator";

@InputType()
export class CreateTireRecapDto {
  @Field(() => Int)
  @ApiProperty({ example: 1, description: "Tire ID to recap" })
  @IsInt()
  tireId: number;

  @Field({ nullable: true })
  @ApiProperty({ example: "Vulcanizadora RCM", required: false })
  @IsOptional()
  @IsString()
  provider?: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "Recap inicial después de 60.000 km",
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @Field(() => Float, { nullable: true })
  @ApiProperty({
    example: 85000.5,
    description: "Costo del recapado en pesos",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  cost?: number;

  @Field(() => Int, { nullable: true })
  @ApiProperty({
    example: 60000,
    description: "Kilómetros acumulados al momento del recapado",
    required: false,
  })
  @IsOptional()
  @IsInt()
  kmAtRecap?: number;

  @Field({ nullable: true })
  @ApiProperty({
    example: "full",
    description: "Tipo de recapado (full, partial, delamination_repair)",
    required: false,
  })
  @IsOptional()
  @IsString()
  recapType?: string;
}
