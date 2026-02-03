import { ObjectType, Field } from "@nestjs/graphql";
import { Province } from "../entities/province.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

@ObjectType()
export class PaginatedProvince {
    @Field(() => [Province])
    data: Province[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
}
