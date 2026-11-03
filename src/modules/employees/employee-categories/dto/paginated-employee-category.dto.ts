import { EmployeeCategory } from "../entities/employee-category.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

export class PaginatedEmployeeCategory {
    data: EmployeeCategory[];

    meta: PaginationMeta;
}
