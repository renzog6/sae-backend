import { Country } from "../entities/country.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

export class PaginatedCountry {
    data: Country[];

    meta: PaginationMeta;
}
