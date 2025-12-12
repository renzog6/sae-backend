// filepath: sae-backend/src/server-files/dto/upload-file.dto.ts
import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ServerFileType } from "./server-file-type.enum";

export class UploadFileDto {
  @ApiProperty({
    enum: ServerFileType,
    description: "Type of entity to associate the file with",
    examples: {
      employee: {
        value: "EMPLOYEE",
        description: "Associate file with an employee",
      },
      company: {
        value: "COMPANY",
        description: "Associate file with a company",
      },
    },
  })
  @IsEnum(ServerFileType)
  entityType: ServerFileType;

  @ApiProperty({
    type: "number",
    description: "ID of the entity to associate the file with",
    example: 123,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  entityId: number;

  @ApiPropertyOptional({
    description: "Optional description for the file",
    example: "Employee contract document",
  })
  @IsOptional()
  @IsString()
  description?: string;
}
