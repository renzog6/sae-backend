//filepath: sae-backend/src/tires/tire-inspections/tire-inspections.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from "@nestjs/common";
import { TireInspectionsService } from "./tire-inspections.service";
import { CreateTireInspectionDto } from "./dto/create-tire-inspection.dto";
import { UpdateTireInspectionDto } from "./dto/update-tire-inspection.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("tire-inspections")
@Controller("tires/inspections")
export class TireInspectionsController {
  constructor(private readonly service: TireInspectionsService) {}

  @Post()
  create(@Body() dto: CreateTireInspectionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("q") q?: string
  ) {
    return this.service.findAll({
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
      q: q || undefined,
    });
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateTireInspectionDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
