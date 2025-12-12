// file: sae-backend/src/modules/companies/controllers/companies.controller.ts
import { BaseController } from "@common/controllers/base.controller";

import {
  Controller,
  UseGuards,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Delete,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
} from "@nestjs/swagger";

import { CompaniesService } from "../services/companies.service";
import { Company } from "../entities/company.entity";
import { CreateCompanyDto } from "../dto/create-company.dto";
import { UpdateCompanyDto } from "../dto/update-company.dto";
import { BaseQueryDto } from "@common/dto";

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

  @Get()
  @ApiOperation({
    summary: "Get all companies with pagination",
    description:
      "Retrieves a paginated list of companies based on query parameters such as page, limit, search, and filters.",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: "number",
    description: "Page number (1-based)",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: "number",
    description: "Items per page",
  })
  @ApiQuery({
    name: "q",
    required: false,
    type: "string",
    description: "Search query for company name or CUIT",
  })
  @ApiQuery({
    name: "sortBy",
    required: false,
    type: "string",
    description: "Sort field",
  })
  @ApiQuery({
    name: "sortOrder",
    required: false,
    type: "string",
    description: "Sort order (asc/desc)",
  })
  override findAll(@Query() query: BaseQueryDto) {
    return super.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get company by ID",
    description: "Retrieves a specific company by its unique identifier.",
  })
  override findOne(@Param("id", ParseIntPipe) id: number) {
    return super.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Create new company",
    description:
      "Creates a new company with the provided data including CUIT, name, address, and business category.",
  })
  override create(@Body() dto: CreateCompanyDto) {
    return super.create(dto);
  }

  @Put(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Update existing company",
    description: "Updates an existing company with the provided data.",
  })
  override update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateCompanyDto
  ) {
    return super.update(id, dto);
  }

  @Delete(":id")
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Delete company (soft delete if applicable)",
    description:
      "Deletes a company by ID. If the model supports soft deletion, the company will be marked as deleted rather than permanently removed.",
  })
  override remove(id: number) {
    return super.remove(id);
  }
}
