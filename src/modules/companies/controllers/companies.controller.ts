import { BaseController } from "@common/controllers/base.controller";

import { Controller, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

import { CompaniesService } from "../services/companies.service";
import { Company } from "../entities/company.entity";

import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("companies")
@ApiBearerAuth()
@Controller("companies")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompaniesController extends BaseController<Company> {
  constructor(private readonly companiesService: CompaniesService) {
    super(companiesService, Company, "Company");
  }

  @Roles(Role.ADMIN)
  override remove(id: number) {
    return super.remove(id);
  }
}
