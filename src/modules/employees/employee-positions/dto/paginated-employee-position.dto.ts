import { ObjectType, Field } from "@nestjs/graphql";
import { EmployeePosition } from "../entities/employee-position.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

@ObjectType()
export class PaginatedEmployeePosition {
    @Field(() => [EmployeePosition])
    data: EmployeePosition[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
}
