// filepath: sae-backend/src/tires/tire-events/tire-events.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Query } from "@nestjs/common";
import { TireEventsService } from "./tire-events.service";
import { CreateTireEventDto } from "./dto/create-tire-event.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("tire-events")
@Controller("tire-events")
export class TireEventsController {
  constructor(private readonly service: TireEventsService) {}

  @Post()
  create(@Body() dto: CreateTireEventDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query("tireId") tireId?: string) {
    return this.service.findAll(tireId ? +tireId : undefined);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}