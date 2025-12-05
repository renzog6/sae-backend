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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BaseQueryDto } from "@common/dto";
import { AddressesService } from "./addresses.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

@ApiTags("locations/addresses")
@Controller("locations/addresses")
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  @ApiOperation({ summary: "Get all addresses" })
  @ApiResponse({ status: 200, description: "Addresses retrieved successfully" })
  findAll(@Query() query: BaseQueryDto) {
    return this.addressesService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get address by ID" })
  @ApiParam({ name: "id", description: "Address ID" })
  @ApiResponse({ status: 200, description: "Address retrieved successfully" })
  findOne(@Param("id") id: string) {
    return this.addressesService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: "Create address" })
  @ApiResponse({ status: 201, description: "Address created successfully" })
  create(@Body() dto: CreateAddressDto) {
    return this.addressesService.create(dto);
  }

  @Post("person/:personId")
  @ApiOperation({ summary: "Create address for a person" })
  @ApiParam({ name: "personId", description: "Person ID" })
  @ApiResponse({ status: 201, description: "Address created successfully" })
  createForPerson(
    @Param("personId") personId: string,
    @Body() dto: CreateAddressDto
  ) {
    return this.addressesService.createForPerson(+personId, dto);
  }

  @Post("company/:companyId")
  @ApiOperation({ summary: "Create address for a company" })
  @ApiParam({ name: "companyId", description: "Company ID" })
  @ApiResponse({ status: 201, description: "Address created successfully" })
  createForCompany(
    @Param("companyId") companyId: string,
    @Body() dto: CreateAddressDto
  ) {
    return this.addressesService.createForCompany(+companyId, dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update address" })
  @ApiParam({ name: "id", description: "Address ID" })
  @ApiResponse({ status: 200, description: "Address updated successfully" })
  update(@Param("id") id: string, @Body() dto: UpdateAddressDto) {
    return this.addressesService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete address" })
  @ApiParam({ name: "id", description: "Address ID" })
  @ApiResponse({ status: 200, description: "Address deleted successfully" })
  remove(@Param("id") id: string) {
    return this.addressesService.remove(+id);
  }

  @Get("city/:cityId")
  @ApiOperation({ summary: "Get addresses by city" })
  @ApiParam({ name: "cityId", description: "City ID" })
  @ApiResponse({ status: 200, description: "Addresses retrieved successfully" })
  byCity(@Param("cityId") cityId: string) {
    return this.addressesService.findByCity(+cityId);
  }

  @Get("company/:companyId")
  @ApiOperation({ summary: "Get addresses by company" })
  @ApiParam({ name: "companyId", description: "Company ID" })
  @ApiResponse({ status: 200, description: "Addresses retrieved successfully" })
  byCompany(@Param("companyId") companyId: string) {
    return this.addressesService.findByCompany(+companyId);
  }

  @Get("person/:personId")
  @ApiOperation({ summary: "Get addresses by person" })
  @ApiParam({ name: "personId", description: "Person ID" })
  @ApiResponse({ status: 200, description: "Addresses retrieved successfully" })
  byPerson(@Param("personId") personId: string) {
    return this.addressesService.findByPerson(+personId);
  }
}
