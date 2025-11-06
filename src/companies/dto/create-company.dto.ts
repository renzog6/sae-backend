import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsInt,
  MaxLength,
  Matches,
} from "class-validator";
import { Type } from "class-transformer";

class AddressDto {
  @ApiProperty({
    description: "ID de la dirección (solo para actualizar)",
    required: false,
    example: 10,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id?: number;
  @ApiProperty({ description: "Calle", required: false })
  @IsString()
  @IsOptional()
  street?: string;

  @ApiProperty({ description: "Número", required: false })
  @IsString()
  @IsOptional()
  number?: string;

  @ApiProperty({ description: "Piso", required: false })
  @IsString()
  @IsOptional()
  floor?: string;

  @ApiProperty({ description: "Departamento", required: false })
  @IsString()
  @IsOptional()
  apartment?: string;

  @ApiProperty({ description: "Barrio", required: false })
  @IsString()
  @IsOptional()
  neighborhood?: string;

  @ApiProperty({ description: "Referencia", required: false })
  @IsString()
  @IsOptional()
  reference?: string;

  @ApiProperty({ description: "ID de ciudad", example: 1 })
  @IsInt()
  @Type(() => Number)
  cityId: number;
}

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

  @ApiProperty({
    description: "Dirección asociada",
    required: false,
    type: AddressDto,
  })
  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  address?: AddressDto;
}
