import { EmployeePosition } from "../entities/employee-position.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

export class PaginatedEmployeePosition {
    data: EmployeePosition[];

    meta: PaginationMeta;
}
