import { ObjectType, Field } from "@nestjs/graphql";
import { EmployeeCategory } from "../entities/employee-category.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

@ObjectType()
export class PaginatedEmployeeCategory {
    @Field(() => [EmployeeCategory])
    data: EmployeeCategory[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
}
