// filepath: sae-backend/src/modules/inspections/controllers/inspections.controller.ts
import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InspectionsService } from "@modules/inspections/services/inspections.service";
import { BaseQueryDto } from "@common/dto/base-query.dto";

@ApiTags("inspections")
@Controller("inspections")
export class InspectionsController {
  constructor(private readonly inspectionsService: InspectionsService) {}

  @Get()
  findAll(@Query() query: BaseQueryDto) {
    return this.inspectionsService.findAll(query);
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
