// filepath: sae-backend/src/tires/tire-positions/tire-positions.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, Query } from "@nestjs/common";
import { TirePositionsService } from "./tire-positions.service";
import { CreateTirePositionDto } from "./dto/create-tire-position.dto";
import { UpdateTirePositionDto } from "./dto/update-tire-position.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("tire-positions")
@Controller("tire-positions")
export class TirePositionsController {
  constructor(private readonly service: TirePositionsService) {}

  @Post()
  create(@Body() dto: CreateTirePositionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query("axleId") axleId?: string) {
    return this.service.findAll(axleId ? +axleId : undefined);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateTirePositionDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}