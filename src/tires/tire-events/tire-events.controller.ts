// filepath: sae-backend/src/tires/tire-events/tire-events.controller.ts
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
  findAll(
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("q") q?: string,
    @Query("eventType") eventType?: string,
    @Query("fromDate") fromDate?: string,
    @Query("toDate") toDate?: string
  ) {
    return this.service.findAllWithFilters({
      page: page ? +page : 1,
      limit: limit ? +limit : 10,
      q: q || undefined,
      eventType: eventType as any,
      fromDate: fromDate ? new Date(fromDate) : undefined,
      toDate: toDate ? new Date(toDate) : undefined,
    });
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
