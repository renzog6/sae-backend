import { BusinessCategory } from "../entities/business-category.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

export class PaginatedBusinessCategory {
    data: BusinessCategory[];

    meta: PaginationMeta;
}
