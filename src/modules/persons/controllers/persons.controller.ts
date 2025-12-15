import { BaseController } from "@common/controllers/base.controller";
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { PersonsService } from "@modules/persons/services/persons.service";
import { CreatePersonDto } from "@modules/persons/dto/create-person.dto";
// import { UpdatePersonDto } from "@modules/persons/dto/update-person.dto";
import { Person } from "../entities/person.entity";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("persons")
@Controller("persons")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PersonsController extends BaseController<Person> {
  constructor(private readonly personsService: PersonsService) {
    super(personsService, Person, "Person");
  }

  @Post()
  @ApiOperation({
    summary: "Create a new person",
    description:
      "Creates a new person with the provided personal information including name, DNI, CUIL, and other details.",
  })
  @ApiBody({ type: CreatePersonDto })
  @ApiResponse({
    status: 201,
    description: "Person created successfully",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  override create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }

  // findAll, findOne, update, remove are standard in BaseController
  // We override create just to keep the specific Swagger decorators for CreatePersonDto if needed.
  // Actually BaseController accepts 'any' for DTO, so overriding allows typing.
}

