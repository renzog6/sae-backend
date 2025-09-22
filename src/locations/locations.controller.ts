import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { CreateCityDto, UpdateCityDto, CreateAddressDto, UpdateAddressDto } from './dto';

@ApiTags('locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  // Country endpoints
  @Get('countries')
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({ status: 200, description: 'List of countries' })
  findAllCountries() {
    return this.locationsService.findAllCountries();
  }

  @Get('countries/:id')
  @ApiOperation({ summary: 'Get country by ID' })
  @ApiParam({ name: 'id', description: 'Country ID' })
  @ApiResponse({ status: 200, description: 'Country found' })
  findOneCountry(@Param('id') id: string) {
    return this.locationsService.findOneCountry(+id);
  }

  @Get('countries/:id/provinces')
  @ApiOperation({ summary: 'Get all provinces by country' })
  @ApiParam({ name: 'id', description: 'Country ID' })
  @ApiResponse({ status: 200, description: 'List of provinces for the country' })
  findProvincesByCountry(@Param('id') id: string) {
    return this.locationsService.findProvincesByCountry(+id);
  }

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
  @ApiResponse({ status: 200, description: 'City found' })
  findOneCity(@Param('id') id: string) {
    return this.locationsService.findOneCity(+id);
  }

  @Post('cities')
  @ApiOperation({ summary: 'Create a new city' })
  @ApiResponse({ status: 201, description: 'City created successfully' })
  createCity(@Body() createCityDto: CreateCityDto) {
    return this.locationsService.createCity(createCityDto);
  }

  @Patch('cities/:id')
  @ApiOperation({ summary: 'Update city by ID' })
  @ApiParam({ name: 'id', description: 'City ID' })
  @ApiResponse({ status: 200, description: 'City updated successfully' })
  updateCity(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.locationsService.updateCity(+id, updateCityDto);
  }

  @Delete('cities/:id')
  @ApiOperation({ summary: 'Delete city by ID' })
  @ApiParam({ name: 'id', description: 'City ID' })
  @ApiResponse({ status: 200, description: 'City deleted successfully' })
  removeCity(@Param('id') id: string) {
    return this.locationsService.removeCity(+id);
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
  @ApiResponse({ status: 200, description: 'Address found' })
  findOneAddress(@Param('id') id: string) {
    return this.locationsService.findOneAddress(+id);
  }

  @Post('addresses')
  @ApiOperation({ summary: 'Create a new address' })
  @ApiResponse({ status: 201, description: 'Address created successfully' })
  createAddress(@Body() createAddressDto: CreateAddressDto) {
    return this.locationsService.createAddress(createAddressDto);
  }

  @Patch('addresses/:id')
  @ApiOperation({ summary: 'Update address by ID' })
  @ApiParam({ name: 'id', description: 'Address ID' })
  @ApiResponse({ status: 200, description: 'Address updated successfully' })
  updateAddress(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.locationsService.updateAddress(+id, updateAddressDto);
  }

  @Delete('addresses/:id')
  @ApiOperation({ summary: 'Delete address by ID' })
  @ApiParam({ name: 'id', description: 'Address ID' })
  @ApiResponse({ status: 200, description: 'Address deleted successfully' })
  removeAddress(@Param('id') id: string) {
    return this.locationsService.removeAddress(+id);
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