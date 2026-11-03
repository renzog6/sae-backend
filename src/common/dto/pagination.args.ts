import { IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";

export class PaginationArgs {
    @Min(0)
    skip: number = 0;

    @Min(1)
    take: number = 10;

    // JSON string for generic filtering/where clauses
    @IsOptional()
    where?: string;

    // JSON string for sorting
    @IsOptional()
    orderBy?: string;

    // Search term
    @IsOptional()
    q?: string;
}
