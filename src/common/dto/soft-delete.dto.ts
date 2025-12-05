// src/common/dto/soft-delete.dto.ts
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsOptional } from "class-validator";

export class SoftDeleteDto {
  @ApiPropertyOptional({
    description: "Filter soft deleted records",
    enum: ["exclude", "only", "include"],
    default: "exclude",
  })
  @IsOptional()
  @IsIn(["exclude", "only", "include"])
  deleted?: "exclude" | "only" | "include" = "exclude";
}
