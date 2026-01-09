import { ObjectType, Field } from "@nestjs/graphql";
import { Employee } from "../entities/employee.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

@ObjectType()
export class PaginatedEmployee {
    @Field(() => [Employee])
    data: Employee[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
}
