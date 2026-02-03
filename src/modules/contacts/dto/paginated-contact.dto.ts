import { ObjectType, Field } from "@nestjs/graphql";
import { Contact } from "../entities/contact.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

@ObjectType()
export class PaginatedContact {
    @Field(() => [Contact])
    data: Contact[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
}
