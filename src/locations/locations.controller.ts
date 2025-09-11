import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { LocationsService } from './locations.service';

@ApiTags('locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  // Province endpoints
  @Get('provinces')
  @ApiOperation({ summary: 'Get all provinces' })
  findAllProvinces() {
    return this.locationsService.findAllProvinces();
  }

  @Get('provinces/:id')
  @ApiOperation({ summary: 'Get province by ID' })
  @ApiParam({ name: 'id', description: 'Province ID' })
  findOneProvince(@Param('id') id: string) {
    return this.locationsService.findOneProvince(+id);
  }

  @Get('provinces/code/:code')
  @ApiOperation({ summary: 'Get province by code' })
  @ApiParam({ name: 'code', description: 'Province code' })
  findProvinceByCode(@Param('code') code: string) {
    return this.locationsService.findProvinceByCode(code);
  }

  // City endpoints
  @Get('cities')
  @ApiOperation({ summary: 'Get all cities' })
  findAllCities() {
    return this.locationsService.findAllCities();
  }

  @Get('cities/:id')
  @ApiOperation({ summary: 'Get city by ID' })
  @ApiParam({ name: 'id', description: 'City ID' })
  findOneCity(@Param('id') id: string) {
    return this.locationsService.findOneCity(+id);
  }

  @Get('cities/province/:provinceId')
  @ApiOperation({ summary: 'Get cities by province' })
  @ApiParam({ name: 'provinceId', description: 'Province ID' })
  findCitiesByProvince(@Param('provinceId') provinceId: string) {
    return this.locationsService.findCitiesByProvince(+provinceId);
  }

  @Get('cities/postal-code/:postalCode')
  @ApiOperation({ summary: 'Get city by postal code' })
  @ApiParam({ name: 'postalCode', description: 'Postal code' })
  findCityByPostalCode(@Param('postalCode') postalCode: string) {
    return this.locationsService.findCityByPostalCode(postalCode);
  }

  // Address endpoints
  @Get('addresses')
  @ApiOperation({ summary: 'Get all addresses' })
  findAllAddresses() {
    return this.locationsService.findAllAddresses();
  }

  @Get('addresses/:id')
  @ApiOperation({ summary: 'Get address by ID' })
  @ApiParam({ name: 'id', description: 'Address ID' })
  findOneAddress(@Param('id') id: string) {
    return this.locationsService.findOneAddress(+id);
  }

  @Get('addresses/city/:cityId')
  @ApiOperation({ summary: 'Get addresses by city' })
  @ApiParam({ name: 'cityId', description: 'City ID' })
  findAddressesByCity(@Param('cityId') cityId: string) {
    return this.locationsService.findAddressesByCity(+cityId);
  }

  @Get('addresses/company/:companyId')
  @ApiOperation({ summary: 'Get addresses by company' })
  @ApiParam({ name: 'companyId', description: 'Company ID' })
  findAddressesByCompany(@Param('companyId') companyId: string) {
    return this.locationsService.findAddressesByCompany(+companyId);
  }
}