import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  MaxLength,
  Matches,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateCompanyDto {
  @ApiProperty({ description: "CUIT", example: "30-12345678-9" })
  @MaxLength(13, { message: "El CUIT debe tener máximo 13 caracteres" })
  @Matches(/^\d{2}-\d{8}-\d{1}$/, {
    message: "El formato de CUIT debe ser XX-XXXXXXXX-X",
  })
  @IsString()
  @IsNotEmpty()
  cuit: string;

  @ApiProperty({ description: "Nombre comercial", example: "Acme SRL" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Razón social", required: false })
  @IsString()
  @IsOptional()
  businessName?: string;

  @ApiProperty({ description: "Información adicional", required: false })
  @IsString()
  @IsOptional()
  information?: string;

  @ApiProperty({
    description: "ID de rubro/categoría",
    required: false,
    example: 1,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  businessCategoryId?: number;
}
