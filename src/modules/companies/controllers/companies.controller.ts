// file: sae-backend/src/modules/companies/controllers/companies.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import { Controller, Delete, Param, ParseIntPipe, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";

import { CompaniesService } from "../services/companies.service";
import { Company } from "../entities/company.entity";
import { GetCompaniesQueryDto } from "../dto/get-companies-query.dto";

import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("companies")
@Controller("companies")
export class CompaniesController extends BaseController<Company> {
  constructor(private readonly companiesService: CompaniesService) {
    super(companiesService, Company, "Company");
  }

  @Get()
  @ApiOperation({ summary: "List all companies" })
  override async findAll(@Query() query: GetCompaniesQueryDto) {
    return this.companiesService.findAll(query);
  }


  @Delete(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Delete company" })
  @ApiParam({ name: "id", type: "number" })
  override remove(@Param("id", ParseIntPipe) id: number) {
    return super.remove(id);
  }
}
