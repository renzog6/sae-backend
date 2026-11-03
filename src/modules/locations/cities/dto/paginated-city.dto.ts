import { City } from "../entities/city.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

export class PaginatedCity {
    data: City[];

    meta: PaginationMeta;
}
