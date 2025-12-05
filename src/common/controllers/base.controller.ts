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
} from "@nestjs/swagger";
import { BaseService } from "../services/base.service";
import { BaseQueryDto } from "../dto/base-query.dto";

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
  @ApiOperation({ summary: "List paginated" })
  // Nota: Agregar @ApiPaginatedResponse(entityClass) en controladores concretos
  async findAll(@Query() query: BaseQueryDto) {
    return this.service.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get one by id" })
  @ApiResponse({ status: 200, description: "OK", type: Object })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create" })
  @ApiCreatedResponse({ description: "Created", type: Object })
  async create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update" })
  @ApiResponse({ status: 200, description: "Updated", type: Object })
  async update(@Param("id", ParseIntPipe) id: number, @Body() dto: any) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Soft-delete or hard-delete depending on model" })
  @ApiResponse({ status: 200, description: "Deleted" })
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Patch(":id/restore")
  @ApiOperation({ summary: "Restore soft-deleted record" })
  @ApiResponse({ status: 200, description: "Restored" })
  async restore(@Param("id", ParseIntPipe) id: number) {
    return this.service.restore(id);
  }

  @Delete(":id/force")
  @ApiOperation({ summary: "Hard delete (permanent)" })
  @ApiResponse({ status: 200, description: "Permanently deleted" })
  async hardDelete(@Param("id", ParseIntPipe) id: number) {
    return this.service.hardDelete(id);
  }
}
