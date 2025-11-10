import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from "@nestjs/common";
import { TireModelsService } from "./tire-models.service";
import { CreateTireModelDto } from "./dto/create-tire-model.dto";
import { UpdateTireModelDto } from "./dto/update-tire-model.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("tire-models")
@Controller("tires/models")
export class TireModelsController {
  constructor(private readonly tireModelsService: TireModelsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new tire model" })
  @ApiResponse({ status: 201, description: "Tire model created successfully" })
  create(@Body() dto: CreateTireModelDto) {
    return this.tireModelsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all tire models with pagination" })
  findAll(@Query("page") page?: string, @Query("limit") limit?: string) {
    return this.tireModelsService.findAll({
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
    });
  }

  @Get(":id")
  @ApiOperation({ summary: "Get tire model by ID" })
  findOne(@Param("id") id: string) {
    return this.tireModelsService.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update tire model information" })
  update(@Param("id") id: string, @Body() dto: UpdateTireModelDto) {
    return this.tireModelsService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete tire model" })
  remove(@Param("id") id: string) {
    return this.tireModelsService.remove(+id);
  }
}
