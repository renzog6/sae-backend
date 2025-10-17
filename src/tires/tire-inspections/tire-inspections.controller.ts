//filepath: sae-backend/src/tires/tire-inspections/tire-inspections.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { TireInspectionsService } from "./tire-inspections.service";
import { CreateTireInspectionDto } from "./dto/create-tire-inspection.dto";
import { UpdateTireInspectionDto } from "./dto/update-tire-inspection.dto";

@Controller("tire-inspections")
export class TireInspectionsController {
  constructor(private readonly service: TireInspectionsService) {}

  @Post()
  create(@Body() dto: CreateTireInspectionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
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
