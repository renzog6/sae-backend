import { Type } from "@nestjs/common";
import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType()
export class PaginationMeta {
    @Field(() => Int)
    total: number;

    @Field(() => Int)
    page: number;

    @Field(() => Int)
    limit: number;
}

export interface IPaginatedType<T> {
    data: T[];
    meta: PaginationMeta;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
    @ObjectType(`Paginated${classRef.name}`)
    class PaginatedType implements IPaginatedType<T> {
        @Field(() => [classRef])
        data: T[];

        @Field(() => PaginationMeta)
        meta: PaginationMeta;
    }
    return PaginatedType as Type<IPaginatedType<T>>;
}
