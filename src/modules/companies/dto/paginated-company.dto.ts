import { ObjectType, Field } from "@nestjs/graphql";
import { Company } from "../entities/company.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

@ObjectType()
export class PaginatedCompany {
    @Field(() => [Company])
    data: Company[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
}
