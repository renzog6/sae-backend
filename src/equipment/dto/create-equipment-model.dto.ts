import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateEquipmentModelDto {
  @ApiProperty({ description: "Model name" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  name: string;

  @ApiPropertyOptional({ description: "Model code" })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({ description: "Model year" })
  @IsNumber()
  @IsOptional()
  year?: number;

  @ApiPropertyOptional({ description: "Model description" })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: "Type ID" })
  @IsNumber()
  @IsOptional()
  typeId?: number;

  @ApiPropertyOptional({ description: "Brand ID" })
  @IsNumber()
  @IsOptional()
  brandId?: number;
}
