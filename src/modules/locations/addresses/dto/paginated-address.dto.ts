import { ObjectType, Field } from "@nestjs/graphql";
import { Address } from "../entities/address.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

@ObjectType()
export class PaginatedAddress {
    @Field(() => [Address])
    data: Address[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
}
