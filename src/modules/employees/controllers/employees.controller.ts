// filepath: sae-backend/src/modules/employees/controllers/employees.controller.ts
import { BaseController } from "@common/controllers/base.controller";
import { Controller } from "@nestjs/common";
import { Roles, Role } from "@common/decorators/roles.decorator";
import { ApiTags } from "@nestjs/swagger";

import { EmployeesService } from "../services/employees.service";
import { Employee } from "../entities/employee.entity";

@ApiTags("employees")
@Controller("employees")
export class EmployeesController extends BaseController<Employee> {
  constructor(private readonly employeesService: EmployeesService) {
    super(employeesService, Employee, "Employee");
  }

  @Roles(Role.ADMIN)
  override remove(id: number) {
    return super.remove(id);
  }
}
