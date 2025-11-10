// filepath: sae-backend/src/modules/locations/addresses/addresses.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AddressesService } from "./addresses.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

@ApiTags("locations/addresses")
@Controller("locations/addresses")
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  @ApiOperation({ summary: "Get all addresses" })
  findAll() {
    return this.addressesService.findAll().then((data) => ({ data }));
  }

  @Get(":id")
  @ApiOperation({ summary: "Get address by ID" })
  @ApiParam({ name: "id", description: "Address ID" })
  findOne(@Param("id") id: string) {
    return this.addressesService.findOne(+id).then((data) => ({ data }));
  }

  @Post()
  @ApiOperation({ summary: "Create address" })
  create(@Body() dto: CreateAddressDto) {
    return this.addressesService.create(dto).then((data) => ({ data }));
  }

  @Post("person/:personId")
  @ApiOperation({ summary: "Create address for a person" })
  @ApiParam({ name: "personId", description: "Person ID" })
  createForPerson(
    @Param("personId") personId: string,
    @Body() dto: CreateAddressDto
  ) {
    return this.addressesService
      .createForPerson(+personId, dto)
      .then((data) => ({ data }));
  }

  @Post("company/:companyId")
  @ApiOperation({ summary: "Create address for a company" })
  @ApiParam({ name: "companyId", description: "Company ID" })
  createForCompany(
    @Param("companyId") companyId: string,
    @Body() dto: CreateAddressDto
  ) {
    return this.addressesService
      .createForCompany(+companyId, dto)
      .then((data) => ({ data }));
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update address" })
  @ApiParam({ name: "id", description: "Address ID" })
  update(@Param("id") id: string, @Body() dto: UpdateAddressDto) {
    return this.addressesService.update(+id, dto).then((data) => ({ data }));
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete address" })
  @ApiParam({ name: "id", description: "Address ID" })
  remove(@Param("id") id: string) {
    return this.addressesService.remove(+id).then((data) => ({ data }));
  }

  @Get("city/:cityId")
  @ApiOperation({ summary: "Get addresses by city" })
  @ApiParam({ name: "cityId", description: "City ID" })
  byCity(@Param("cityId") cityId: string) {
    return this.addressesService.findByCity(+cityId).then((data) => ({ data }));
  }

  @Get("company/:companyId")
  @ApiOperation({ summary: "Get addresses by company" })
  @ApiParam({ name: "companyId", description: "Company ID" })
  byCompany(@Param("companyId") companyId: string) {
    return this.addressesService
      .findByCompany(+companyId)
      .then((data) => ({ data }));
  }

  @Get("person/:personId")
  @ApiOperation({ summary: "Get addresses by person" })
  @ApiParam({ name: "personId", description: "Person ID" })
  byPerson(@Param("personId") personId: string) {
    return this.addressesService
      .findByPerson(+personId)
      .then((data) => ({ data }));
  }
}
