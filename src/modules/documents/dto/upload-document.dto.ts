// filepath: sae-backend/src/modules/documents/dto/upload-document.dto.ts
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { ExactlyOneOf } from "@common/validators/exactly-one-of.decorator";

export class UploadDocumentDto {
  @ApiProperty({
    description: "Descripción del documento (mínimo 3 caracteres)",
    minLength: 3,
    maxLength: 500,
  })
  @IsString()
  @MinLength(3, { message: "La descripción debe tener al menos 3 caracteres" })
  @MaxLength(500)
  description: string;

  @ApiPropertyOptional({ description: "ID del empleado dueño del documento" })
  @IsOptional()
  @IsInt()
  @Min(1)
  employeeId?: number;

  @ApiPropertyOptional({ description: "ID de la empresa dueña del documento" })
  @IsOptional()
  @IsInt()
  @Min(1)
  companyId?: number;

  // Apply mutual exclusivity validation (class-level via attaching to one property)
  @ExactlyOneOf(["employeeId", "companyId"], {
    message: "Debe especificar exactamente uno de: employeeId o companyId",
  })
  private _xor?: unknown;
}
