import { ObjectType, Field } from "@nestjs/graphql";
import { Person } from "../entities/person.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

@ObjectType()
export class PaginatedPerson {
    @Field(() => [Person])
    data: Person[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
}
