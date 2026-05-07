import { Resolver, Query, Args, Mutation, Int } from "@nestjs/graphql";
import { EmployeesService } from "./services/employees.service";
import { Employee } from "./entities/employee.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { PaginatedEmployee } from "./dto/paginated-employee.dto";
import { PaginationArgs } from "@common/dto/pagination.args";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

@Resolver(() => Employee)
export class EmployeesResolver extends BaseResolver(Employee, {
  createInput: CreateEmployeeDto,
  updateInput: UpdateEmployeeDto,
}) {
  constructor(private readonly employeesService: EmployeesService) {
    super(employeesService);
  }

  @Query(() => PaginatedEmployee, { name: "findAllEmployees" })
  async findAll(@Args() args: PaginationArgs): Promise<PaginatedEmployee> {
    const query = { ...args, deleted: "exclude" } as any;
    const result = await this.employeesService.findAll(query);
    return result as any;
  }

  @Mutation(() => Employee, { name: "createEmployee" })
  async create(
    @Args("input", { type: () => CreateEmployeeDto }) input: CreateEmployeeDto,
  ): Promise<Employee> {
    const result = await this.employeesService.create(input);
    return result.data;
  }

  @Mutation(() => Employee, { name: "updateEmployee" })
  async update(
    @Args("id", { type: () => Int }) id: number,
    @Args("input", { type: () => UpdateEmployeeDto }) input: UpdateEmployeeDto,
  ): Promise<Employee> {
    const result = await this.employeesService.update(id, input);
    return result.data;
  }
}
