import { Person } from "../entities/person.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

export class PaginatedPerson {
    data: Person[];

    meta: PaginationMeta;
}
