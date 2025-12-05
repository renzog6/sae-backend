// src/common/dto/base-query.dto.ts
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsNumber, IsString, Min, Max } from "class-validator";
import { SoftDeleteDto } from "./soft-delete.dto";

export class BaseQueryDto extends SoftDeleteDto {
  @ApiPropertyOptional({
    description: "Page number (1-based)",
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: "Items per page",
    example: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  private _skip?: number;
  private _take?: number;

  @ApiPropertyOptional({ description: "Search query", example: "search term" })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ description: "Sort field", example: "createdAt" })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    description: "Sort order",
    example: "desc",
    enum: ["asc", "desc"],
  })
  @IsOptional()
  @IsString()
  sortOrder?: "asc" | "desc" = "desc";

  get skip(): number {
    if (this._skip === undefined) {
      this._skip = ((this.page || 1) - 1) * (this.limit || 10);
    }
    return this._skip;
  }

  get take(): number {
    if (this._take === undefined) {
      this._take = this.limit || 10;
    }
    return this._take;
  }
}
