// filepath: sae-backend/src/modules/companies/controllers/companies.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CompaniesService } from "../services/companies.service";
import { CreateCompanyDto } from "../dto/create-company.dto";
import { UpdateCompanyDto } from "../dto/update-company.dto";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";
import { BaseQueryDto } from "@common/dto";

@ApiTags("companies")
@Controller("companies")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new company" })
  @ApiResponse({ status: 201, description: "Company created successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService
      .create(createCompanyDto)
      .then((data) => ({ data }));
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all companies" })
  @ApiResponse({ status: 200, description: "Companies retrieved successfully" })
  findAll(@Query() query: BaseQueryDto) {
    return this.companiesService.findAll(query);
  }

  @Get(":id(\\d+)")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a company by ID" })
  @ApiResponse({ status: 200, description: "Company retrieved successfully" })
  @ApiResponse({ status: 404, description: "Company not found" })
  findOne(@Param("id") id: string) {
    return this.companiesService.findOne(id).then((data) => ({ data }));
  }

  @Put(":id(\\d+)")
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a company" })
  @ApiResponse({ status: 200, description: "Company updated successfully" })
  @ApiResponse({ status: 404, description: "Company not found" })
  update(@Param("id") id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService
      .update(id, updateCompanyDto)
      .then((data) => ({ data }));
  }

  @Delete(":id(\\d+)")
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a company" })
  @ApiResponse({ status: 200, description: "Company deleted successfully" })
  @ApiResponse({ status: 404, description: "Company not found" })
  remove(@Param("id") id: string) {
    return this.companiesService.remove(id).then((data) => ({ data }));
  }
}
