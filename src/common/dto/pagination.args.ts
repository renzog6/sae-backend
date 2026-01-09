import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
export class PaginationArgs {
    @Field(() => Int, { defaultValue: 0 })
    @Min(0)
    skip: number = 0;

    @Field(() => Int, { defaultValue: 10 })
    @Min(1)
    take: number = 10;

    // JSON string for generic filtering/where clauses
    @Field(() => String, { nullable: true })
    @IsOptional()
    where?: string;

    // JSON string for sorting
    @Field(() => String, { nullable: true })
    @IsOptional()
    orderBy?: string;

    // Search term
    @Field(() => String, { nullable: true })
    @IsOptional()
    q?: string;
}
