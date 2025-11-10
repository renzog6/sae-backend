// filepath: sae-backend/src/modules/equipment/controllers/equipment-axles.controller.ts
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
import { EquipmentAxlesService } from "../services/equipment-axles.service";
import {
  CreateEquipmentAxleDto,
  CreateEquipmentAxleWithPositionsDto,
} from "../dto/create-equipment-axle.dto";
import { UpdateEquipmentAxleDto } from "../dto/update-equipment-axle.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("equipment-axles")
@Controller("equipments/axles")
export class EquipmentAxlesController {
  constructor(private readonly service: EquipmentAxlesService) {}

  @Post()
  create(@Body() dto: CreateEquipmentAxleDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query("equipmentId") equipmentId?: string) {
    return this.service.findAll(equipmentId ? +equipmentId : undefined);
  }

  @Get("positions/equipment/:equipmentId")
  findPositionsByEquipment(@Param("equipmentId") equipmentId: string) {
    return this.service.findPositionsByEquipment(+equipmentId);
  }

  @Post("with-positions")
  @ApiOperation({ summary: "Create axle with positions" })
  createWithPositions(@Body() dto: CreateEquipmentAxleWithPositionsDto) {
    return this.service.createWithPositions(dto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateEquipmentAxleDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
