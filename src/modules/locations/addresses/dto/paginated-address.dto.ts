import { Address } from "../entities/address.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

export class PaginatedAddress {
    data: Address[];

    meta: PaginationMeta;
}
