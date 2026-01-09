import { ObjectType, Field } from "@nestjs/graphql";
import { BusinessSubCategory } from "../entities/business-subcategory.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

@ObjectType()
export class PaginatedBusinessSubCategory {
    @Field(() => [BusinessSubCategory])
    data: BusinessSubCategory[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
}
