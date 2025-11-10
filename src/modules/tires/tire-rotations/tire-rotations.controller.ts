//filepath: sae-backend/src/tires/tire-rotations/tire-rotations.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { TireRotationsService } from "./tire-rotations.service";
import { CreateTireRotationDto } from "./dto/create-tire-rotation.dto";
import { UpdateTireRotationDto } from "./dto/update-tire-rotation.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("tire-rotations")
@Controller("tires/rotations")
export class TireRotationsController {
  constructor(private readonly service: TireRotationsService) {}

  @Post()
  create(@Body() dto: CreateTireRotationDto) {
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
  update(@Param("id") id: string, @Body() dto: UpdateTireRotationDto) {
    return this.service.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.service.remove(+id);
  }
}
