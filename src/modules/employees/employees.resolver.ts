import { Resolver, Query, Args } from "@nestjs/graphql";
import { EmployeesService } from "./services/employees.service";
import { Employee } from "./entities/employee.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { PaginatedEmployee } from "./dto/paginated-employee.dto";
import { PaginationArgs } from "@common/dto/pagination.args";

@Resolver(() => Employee)
export class EmployeesResolver extends BaseResolver(Employee) {
    constructor(private readonly employeesService: EmployeesService) {
        super(employeesService);
    }

    @Query(() => PaginatedEmployee, { name: 'findAllEmployees' })
    async findAll(@Args() args: PaginationArgs): Promise<PaginatedEmployee> {
        const query = { ...args, deleted: 'exclude' } as any;
        const result = await this.employeesService.findAll(query);
        return result as any;
    }
}
