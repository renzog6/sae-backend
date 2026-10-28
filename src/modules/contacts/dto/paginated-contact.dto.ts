import { Contact } from "../entities/contact.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

export class PaginatedContact {
    data: Contact[];

    meta: PaginationMeta;
}
