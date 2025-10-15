import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateEquipmentTypeDto {
  @ApiProperty({ description: "Type name" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  name: string;

  @ApiPropertyOptional({ description: "Type code" })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({ description: "Type description" })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: "Category ID" })
  @IsNumber()
  @IsOptional()
  categoryId?: number;
}
