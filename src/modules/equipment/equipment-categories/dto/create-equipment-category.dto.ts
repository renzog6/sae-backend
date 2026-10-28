import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateEquipmentCategoryDto {
  @ApiProperty({ description: "Category name" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  name: string;

  @ApiPropertyOptional({ description: "Category code" })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({ description: "Category description" })
  @IsString()
  @IsOptional()
  description?: string;
}
