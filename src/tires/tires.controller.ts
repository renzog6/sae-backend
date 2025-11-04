//filepath: sae-backend/src/tires/tires.controller.ts
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
import { TiresService } from "./tires.service";
import { CreateTireDto } from "./dto/create-tire.dto";
import { UpdateTireDto } from "./dto/update-tire.dto";
import { BaseQueryDto } from "../common/dto/base-query.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("tires")
@Controller("tires")
export class TiresController {
  constructor(private readonly tiresService: TiresService) {}

  @Post()
  @ApiOperation({ summary: "Create a new tire" })
  @ApiResponse({ status: 201, description: "Tire created successfully" })
  create(@Body() dto: CreateTireDto) {
    return this.tiresService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all tires with pagination and filters" })
  findAll(@Query() query: BaseQueryDto, @Query("status") status?: string) {
    return this.tiresService.findAll(query, status);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get tire by ID" })
  findOne(@Param("id") id: string) {
    return this.tiresService.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update tire information" })
  update(@Param("id") id: string, @Body() dto: UpdateTireDto) {
    return this.tiresService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete tire" })
  remove(@Param("id") id: string) {
    return this.tiresService.remove(+id);
  }
}
