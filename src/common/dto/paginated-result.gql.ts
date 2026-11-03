import { Type } from "@nestjs/common";

export class PaginationMeta {
    total: number;

    page: number;

    limit: number;
}

export interface IPaginatedType<T> {
    data: T[];
    meta: PaginationMeta;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
    class PaginatedType implements IPaginatedType<T> {
        data: T[];

        meta: PaginationMeta;
    }
    return PaginatedType as Type<IPaginatedType<T>>;
}
