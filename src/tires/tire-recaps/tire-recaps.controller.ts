//filepath: sae-backend/src/tires/tire-recaps/tire-recaps.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { TireRecapsService } from "./tire-recaps.service";
import { CreateTireRecapDto } from "./dto/create-tire-recap.dto";
import { UpdateTireRecapDto } from "./dto/update-tire-recap.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("tire-recaps")
@Controller("tires/recaps")
export class TireRecapsController {
  constructor(private readonly service: TireRecapsService) {}

  @Post()
  @ApiOperation({ summary: "Register a new tire recap event" })
  create(@Body() dto: CreateTireRecapDto) {
    return this.service.create(dto /*, userId */);
  }

  @Get()
  @ApiOperation({ summary: "Get all tire recap records" })
  findAll() {
    return this.service.findAll();
  }

  @Get("tire/:tireId")
  @ApiOperation({ summary: "Get recap history for a specific tire" })
  findByTire(@Param("tireId") tireId: string) {
    return this.service.findByTire(+tireId);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update recap record" })
  update(@Param("id") id: string, @Body() dto: UpdateTireRecapDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete recap record" })
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
