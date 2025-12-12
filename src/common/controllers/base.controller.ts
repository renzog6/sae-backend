// filepath: sae-backend/src/common/controllers/base.controller.ts
import {
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { BaseService } from "../services/base.service";
import { BaseQueryDto } from "../dto/base-query.dto";
import { PaginationResponseDto } from "../dto/pagination-response.dto";

/**
 * BaseController genérico.
 * - service: instancia del servicio que extiende BaseService
 * - entity: clase del DTO/model para Swagger
 *
 * EJEMPLO de uso en un controlador concreto:
 * @Controller('employees')
 * export class EmployeesController extends BaseController<EmployeeDto> {
 *   constructor(protected readonly service: EmployeesService) {
 *     super(service, EmployeeDto, 'Employees');
 *   }
 *
 *   // Agregar decoradores aquí, ej:
 *   @ApiTags('employees')
 *   @Get()
 *   @ApiPaginatedResponse(EmployeeDto)
 *   async findAll(@Query() query: BaseQueryDto) {
 *     return super.findAll(query);
 *   }
 * }
 */
export class BaseController<T> {
  constructor(
    protected readonly service: BaseService<any>,
    protected readonly entityClass: new (...args: any[]) => T,
    protected readonly tagName = "Items"
  ) {
    // Sin asignación redundante
  }

  // Nota: Agregar @ApiTags('tagName') en controladores concretos

  @Get()
  @ApiOperation({
    summary: "List all items with pagination",
    description:
      "Retrieves a paginated list of items based on query parameters such as page, limit, search, and filters.",
  })
  @ApiOkResponse({
    description: "Successfully retrieved paginated items",
    type: PaginationResponseDto,
  })
  @ApiBadRequestResponse({ description: "Invalid query parameters provided" })
  async findAll(@Query() query: BaseQueryDto) {
    return this.service.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get item by ID",
    description: "Retrieves a specific item by its unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the item",
  })
  @ApiOkResponse({
    description: "Successfully retrieved the item",
    type: Object,
  })
  @ApiNotFoundResponse({ description: "Item not found with the specified ID" })
  @ApiBadRequestResponse({ description: "Invalid ID format provided" })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: "Create new item",
    description: "Creates a new item with the provided data.",
  })
  @ApiCreatedResponse({
    description: "Successfully created the new item",
    type: Object,
  })
  @ApiBadRequestResponse({
    description: "Invalid data provided for item creation",
  })
  async create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update existing item",
    description: "Updates an existing item with the provided data.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the item to update",
  })
  @ApiOkResponse({
    description: "Successfully updated the item",
    type: Object,
  })
  @ApiNotFoundResponse({ description: "Item not found with the specified ID" })
  @ApiBadRequestResponse({
    description: "Invalid data or ID provided for item update",
  })
  async update(@Param("id", ParseIntPipe) id: number, @Body() dto: any) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Delete item (soft delete if applicable)",
    description:
      "Deletes an item by ID. If the model supports soft deletion, the item will be marked as deleted rather than permanently removed.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the item to delete",
  })
  @ApiOkResponse({ description: "Successfully deleted the item" })
  @ApiNotFoundResponse({ description: "Item not found with the specified ID" })
  @ApiBadRequestResponse({ description: "Invalid ID provided for deletion" })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Patch(":id/restore")
  @ApiOperation({
    summary: "Restore soft-deleted item",
    description:
      "Restores a previously soft-deleted item, making it active again.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the soft-deleted item to restore",
  })
  @ApiOkResponse({ description: "Successfully restored the item" })
  @ApiNotFoundResponse({
    description: "Soft-deleted item not found with the specified ID",
  })
  @ApiBadRequestResponse({
    description: "Invalid ID provided or item cannot be restored",
  })
  async restore(@Param("id", ParseIntPipe) id: number) {
    return this.service.restore(id);
  }

  @Delete(":id/force")
  @ApiOperation({
    summary: "Permanently delete item",
    description:
      "Permanently deletes an item from the database. This action cannot be undone.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the item to permanently delete",
  })
  @ApiOkResponse({ description: "Successfully permanently deleted the item" })
  @ApiNotFoundResponse({ description: "Item not found with the specified ID" })
  @ApiBadRequestResponse({
    description: "Invalid ID provided for permanent deletion",
  })
  async hardDelete(@Param("id", ParseIntPipe) id: number) {
    return this.service.hardDelete(id);
  }
}
