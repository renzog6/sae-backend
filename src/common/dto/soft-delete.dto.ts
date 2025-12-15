// src/common/dto/soft-delete.dto.ts
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsIn } from "class-validator";
export class SoftDeleteDto {
  @ApiPropertyOptional({
    description: "Soft delete filter",
    enum: ["exclude", "only", "include"],
    default: "exclude",
  })
  @IsOptional()
  @IsIn(["exclude", "only", "include"])
  deleted: "exclude" | "only" | "include" = "exclude";
}
