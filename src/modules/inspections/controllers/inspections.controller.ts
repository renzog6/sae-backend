// filepath: sae-backend/src/modules/inspections/controllers/inspections.controller.ts
import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InspectionsService } from "../services/inspections.service";

@ApiTags("inspections")
@Controller("inspections")
export class InspectionsController {
  constructor(private readonly inspectionsService: InspectionsService) {}

  @Get()
  findAll() {
    return this.inspectionsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.inspectionsService.findOne(+id);
  }

  @Get("types")
  findInspectionTypes() {
    return this.inspectionsService.findInspectionTypes();
  }
}
