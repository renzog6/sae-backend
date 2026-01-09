import { ObjectType, Field } from "@nestjs/graphql";
import { BusinessCategory } from "../entities/business-category.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

@ObjectType()
export class PaginatedBusinessCategory {
    @Field(() => [BusinessCategory])
    data: BusinessCategory[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
}
