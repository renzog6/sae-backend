// file: sae-backend/src/modules/companies/controllers/companies.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import { Controller, Delete, Param, ParseIntPipe, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";

import { CompaniesService } from "../services/companies.service";
import { Company } from "../entities/company.entity";
import { GetCompaniesQueryDto } from "../dto/get-companies-query.dto";

import { Roles, Role } from "@common/decorators/roles.decorator";
import { Body, Post, Put } from "@nestjs/common";
import { CreateCompanyDto } from "../dto/create-company.dto";
import { UpdateCompanyDto } from "../dto/update-company.dto";

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
  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return super.create(dto);
  }

  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateCompanyDto) {
    return super.update(id, dto);
  }
}
