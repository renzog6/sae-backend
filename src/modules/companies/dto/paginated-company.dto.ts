import { Company } from "../entities/company.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

export class PaginatedCompany {
    data: Company[];

    meta: PaginationMeta;
}
