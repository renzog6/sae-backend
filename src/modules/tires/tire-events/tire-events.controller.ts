// filepath: sae-backend/src/modules/tires/tire-events/tire-events.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { TireEventsService } from "./tire-events.service";
import { CreateTireEventDto } from "./dto/create-tire-event.dto";
import { TireEventsQueryDto } from "./dto/tire-events-query.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("tire-events")
@Controller("tires/events")
export class TireEventsController {
  constructor(private readonly service: TireEventsService) {}

  @Post()
  create(@Body() dto: CreateTireEventDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: TireEventsQueryDto) {
    return this.service.findAll(query);
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
