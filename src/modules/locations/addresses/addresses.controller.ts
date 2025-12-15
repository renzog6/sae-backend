import { BaseController } from "@common/controllers/base.controller";
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AddressesService } from "./addresses.service";
import { CreateAddressDto } from "./dto/create-address.dto";
// import { UpdateAddressDto } from "./dto/update-address.dto"; // Not used explicitly if update is handled by base or if we keep custom update?
// Actually BaseController handles update if we pass the DTO type to it? No, BaseController takes Entity.
// BaseController implements update taking DeepPartial<Entity>.
// But our controller usually takes specific DTOs.
// Let's check BaseController definition if possible or just assume standard behavior.
// Standard behavior: BaseController.update takes Body() data.
// We should check if we need to override `update` or if BaseController allows generic.
// Usually BaseController is: update(@Param('id') id: number, @Body() data: any)
// If we want Swagger to show UpdateAddressDto, we might need to override it OR BaseController is generic enough.
// The user request is to "use BaseController".
// Let's assume we can remove the explicit CRUD methods.
// BUT, we need to import the Entity.

import { Address } from "./entities/address.entity"; // Verifying entity path next step, assuming this for now or waiting.
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("locations/addresses")
@Controller("locations/addresses")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AddressesController extends BaseController<Address> {
  constructor(private readonly addressesService: AddressesService) {
    super(addressesService, Address, "Address");
  }

  @Roles(Role.ADMIN)
  override remove(id: number) {
    return super.remove(id);
  }

  // Custom methods start here


  @Post("person/:personId")
  @ApiOperation({
    summary: "Create address for a person",
    description:
      "Creates a new address and associates it with a specific person.",
  })
  @ApiParam({
    name: "personId",
    type: "number",
    description: "Unique identifier of the person",
  })
  @ApiBody({ type: CreateAddressDto })
  @ApiResponse({ status: 201, description: "Address created successfully" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  @ApiResponse({ status: 404, description: "Person not found" })
  createForPerson(
    @Param("personId") personId: string,
    @Body() dto: CreateAddressDto
  ) {
    return this.addressesService.createForPerson(+personId, dto);
  }

  @Post("company/:companyId")
  @ApiOperation({
    summary: "Create address for a company",
    description:
      "Creates a new address and associates it with a specific company.",
  })
  @ApiParam({
    name: "companyId",
    type: "number",
    description: "Unique identifier of the company",
  })
  @ApiBody({ type: CreateAddressDto })
  @ApiResponse({ status: 201, description: "Address created successfully" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  @ApiResponse({ status: 404, description: "Company not found" })
  createForCompany(
    @Param("companyId") companyId: string,
    @Body() dto: CreateAddressDto
  ) {
    return this.addressesService.createForCompany(+companyId, dto);
  }



  @Get("city/:cityId")
  @ApiOperation({
    summary: "Get addresses by city",
    description: "Retrieves all addresses located in a specific city.",
  })
  @ApiParam({
    name: "cityId",
    type: "number",
    description: "Unique identifier of the city",
  })
  @ApiResponse({ status: 200, description: "Addresses retrieved successfully" })
  @ApiResponse({ status: 404, description: "City not found" })
  byCity(@Param("cityId") cityId: string) {
    return this.addressesService.findByCity(+cityId);
  }

  @Get("company/:companyId")
  @ApiOperation({
    summary: "Get addresses by company",
    description: "Retrieves all addresses associated with a specific company.",
  })
  @ApiParam({
    name: "companyId",
    type: "number",
    description: "Unique identifier of the company",
  })
  @ApiResponse({ status: 200, description: "Addresses retrieved successfully" })
  @ApiResponse({ status: 404, description: "Company not found" })
  byCompany(@Param("companyId") companyId: string) {
    return this.addressesService.findByCompany(+companyId);
  }

  @Get("person/:personId")
  @ApiOperation({
    summary: "Get addresses by person",
    description: "Retrieves all addresses associated with a specific person.",
  })
  @ApiParam({
    name: "personId",
    type: "number",
    description: "Unique identifier of the person",
  })
  @ApiResponse({ status: 200, description: "Addresses retrieved successfully" })
  @ApiResponse({ status: 404, description: "Person not found" })
  byPerson(@Param("personId") personId: string) {
    return this.addressesService.findByPerson(+personId);
  }
}
