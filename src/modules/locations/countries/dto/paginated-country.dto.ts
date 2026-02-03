import { ObjectType, Field } from "@nestjs/graphql";
import { Country } from "../entities/country.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

@ObjectType()
export class PaginatedCountry {
    @Field(() => [Country])
    data: Country[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
}
