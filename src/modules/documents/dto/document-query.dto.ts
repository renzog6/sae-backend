//filepath: sae-backend/src/modules/documents/dto/document-query.dto.ts
import { BaseQueryDto } from "@common/dto";
import { IsOptional, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

/**
 * Extends BaseQueryDto to include document-specific filters.
 */
export class DocumentQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    description: "Filter by employee ID",
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  employeeId?: number;

  @ApiPropertyOptional({
    description: "Filter by company ID",
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  companyId?: number;
}
