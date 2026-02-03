import { ObjectType, Field } from "@nestjs/graphql";
import { City } from "../entities/city.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

@ObjectType()
export class PaginatedCity {
    @Field(() => [City])
    data: City[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
}
