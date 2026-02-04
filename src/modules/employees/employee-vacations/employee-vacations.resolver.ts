import { Resolver } from "@nestjs/graphql";
import { EmployeeVacationsService } from "./employee-vacations.service";
import { EmployeeVacation } from "./entities/employee-vacation.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { CreateEmployeeVacationDto } from "./dto/create-employee-vacation.dto";
import { UpdateEmployeeVacationDto } from "./dto/update-employee-vacation.dto";

@Resolver(() => EmployeeVacation)
export class EmployeeVacationsResolver extends BaseResolver(EmployeeVacation, {
    createInput: CreateEmployeeVacationDto,
    updateInput: UpdateEmployeeVacationDto,
}) {
    constructor(private readonly employeeVacationsService: EmployeeVacationsService) {
        super(employeeVacationsService);
    }
}
