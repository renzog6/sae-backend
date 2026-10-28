import { Employee } from "../entities/employee.entity";
import { PaginationMeta } from "@common/dto/paginated-result.gql";

export class PaginatedEmployee {
    data: Employee[];

    meta: PaginationMeta;
}
