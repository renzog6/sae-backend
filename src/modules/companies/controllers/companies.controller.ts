// file: sae-backend/src/modules/companies/controllers/companies.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import { Controller, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";

import { CompaniesService } from "../services/companies.service";
import { Company } from "../entities/company.entity";

import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("companies")
@Controller("companies")
export class CompaniesController extends BaseController<Company> {
  constructor(private readonly companiesService: CompaniesService) {
    super(companiesService, Company, "Company");
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Delete company" })
  @ApiParam({ name: "id", type: "number" })
  override remove(@Param("id", ParseIntPipe) id: number) {
    return super.remove(id);
  }
}
