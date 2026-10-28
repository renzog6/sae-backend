import { BusinessSubCategory } from "../entities/business-subcategory.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

export class PaginatedBusinessSubCategory {
    data: BusinessSubCategory[];

    meta: PaginationMeta;
}
