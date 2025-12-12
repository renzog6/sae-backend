//filepath: sae-backend/src/common/dto/pagination-meta.dto.ts
import { ApiProperty } from "@nestjs/swagger";

export class PaginationMetaDto {
  @ApiProperty({ description: "Total number of records available" })
  total: number;

  @ApiProperty({ description: "Current page number (1-based)" })
  page: number;

  @ApiProperty({ description: "Number of records per page" })
  limit: number;

  @ApiProperty({ description: "Total number of pages available" })
  totalPages: number;

  constructor(total: number, page: number, limit: number) {
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(total / limit);
  }
}
