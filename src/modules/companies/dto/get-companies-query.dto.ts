import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";
import { BaseQueryDto } from "@common/dto/base-query.dto";

export class GetCompaniesQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    description: "Filter by Business Category ID",
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  businessCategoryId?: number;
}
