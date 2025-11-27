// filepath: sae-backend/src/modules/persons/controllers/persons.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { PersonsService } from "@modules/persons/services/persons.service";
import { CreatePersonDto } from "@modules/persons/dto/create-person.dto";
import { UpdatePersonDto } from "@modules/persons/dto/update-person.dto";
import { BaseQueryDto } from "@common/dto/base-query.dto";

@ApiTags("persons")
@Controller("persons")
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }

  @Get()
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  findAll(@Query() query: BaseQueryDto) {
    return this.personsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.personsService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personsService.update(+id, updatePersonDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.personsService.remove(+id);
  }
}
