import { Province } from "../entities/province.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

export class PaginatedProvince {
    data: Province[];

    meta: PaginationMeta;
}
