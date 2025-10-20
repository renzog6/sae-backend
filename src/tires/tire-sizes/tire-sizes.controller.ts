//filepath: sae-backend/src/tires/tire-sizes/tire-sizes.controller.ts
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
import { TireSizesService } from "./tire-sizes.service";
import { CreateTireSizeDto } from "./dto/create-tire-size.dto";
import { UpdateTireSizeDto } from "./dto/update-tire-size.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("tire-sizes")
@Controller("tires/sizes")
export class TireSizesController {
  constructor(private readonly tireSizesService: TireSizesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new tire size" })
  @ApiResponse({ status: 201, description: "Tire size created successfully" })
  create(@Body() dto: CreateTireSizeDto) {
    return this.tireSizesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all tire sizes with pagination" })
  findAll(
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("query") query?: string
  ) {
    return this.tireSizesService.findAll({
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
      query: query || undefined,
    });
  }

  @Get(":id")
  @ApiOperation({ summary: "Get tire size by ID" })
  findOne(@Param("id") id: string) {
    return this.tireSizesService.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update tire size information" })
  update(@Param("id") id: string, @Body() dto: UpdateTireSizeDto) {
    return this.tireSizesService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete tire size" })
  remove(@Param("id") id: string) {
    return this.tireSizesService.remove(+id);
  }

  @Get(":sizeId/aliases")
  @ApiOperation({ summary: "Get aliases for a specific tire size" })
  getAliases(@Param("sizeId") sizeId: string) {
    return this.tireSizesService.getAliases(+sizeId);
  }
}
