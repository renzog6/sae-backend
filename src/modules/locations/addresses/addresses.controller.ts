// filepath: sae-backend/src/modules/locations/addresses/addresses.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from "@nestjs/swagger";
import { BaseQueryDto } from "@common/dto";
import { AddressesService } from "./addresses.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

@ApiTags("locations/addresses")
@Controller("locations/addresses")
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  @ApiOperation({
    summary: "Get all addresses with pagination",
    description:
      "Retrieves a paginated list of addresses based on query parameters such as page, limit, search, and filters.",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
    description: "Page number (1-based)",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
    description: "Items per page",
  })
  @ApiQuery({
    name: "q",
    required: false,
    type: String,
    description: "Search query for street, neighborhood, or reference",
  })
  @ApiQuery({
    name: "sortBy",
    required: false,
    type: String,
    description: "Sort field",
  })
  @ApiQuery({
    name: "sortOrder",
    required: false,
    type: String,
    description: "Sort order (asc/desc)",
  })
  @ApiResponse({ status: 200, description: "Addresses retrieved successfully" })
  findAll(@Query() query: BaseQueryDto) {
    return this.addressesService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get address by ID",
    description: "Retrieves a specific address by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the address",
  })
  @ApiResponse({ status: 200, description: "Address retrieved successfully" })
  @ApiResponse({ status: 404, description: "Address not found" })
  findOne(@Param("id") id: string) {
    return this.addressesService.findOne(+id);
  }

  @Post()
  @ApiOperation({
    summary: "Create a new address",
    description: "Creates a new address with the provided location details.",
  })
  @ApiBody({ type: CreateAddressDto })
  @ApiResponse({ status: 201, description: "Address created successfully" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  create(@Body() dto: CreateAddressDto) {
    return this.addressesService.create(dto);
  }

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

  @Put(":id")
  @ApiOperation({
    summary: "Update address information",
    description: "Updates an existing address with the provided data.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the address to update",
  })
  @ApiBody({ type: UpdateAddressDto })
  @ApiResponse({ status: 200, description: "Address updated successfully" })
  @ApiResponse({ status: 404, description: "Address not found" })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  update(@Param("id") id: string, @Body() dto: UpdateAddressDto) {
    return this.addressesService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete address",
    description: "Deletes an address by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the address to delete",
  })
  @ApiResponse({ status: 200, description: "Address deleted successfully" })
  @ApiResponse({ status: 404, description: "Address not found" })
  remove(@Param("id") id: string) {
    return this.addressesService.remove(+id);
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
