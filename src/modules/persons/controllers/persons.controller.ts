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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { PersonsService } from "@modules/persons/services/persons.service";
import { CreatePersonDto } from "@modules/persons/dto/create-person.dto";
import { UpdatePersonDto } from "@modules/persons/dto/update-person.dto";
import { BaseQueryDto } from "@common/dto";

@ApiTags("persons")
@Controller("persons")
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

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
    schema: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "number" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            birthDate: { type: "string", format: "date-time" },
            dni: { type: "string" },
            cuil: { type: "string" },
            gender: { type: "string" },
            maritalStatus: { type: "string" },
            information: { type: "string" },
            status: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all persons with pagination",
    description:
      "Retrieves a paginated list of persons based on query parameters such as page, limit, search, and filters.",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: Number,
    description: "Page number (1-based)",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: Number,
    description: "Items per page",
  })
  @ApiQuery({
    name: "q",
    required: false,
    type: String,
    description: "Search query for name, DNI, or CUIL",
  })
  @ApiQuery({
    name: "sortBy",
    required: false,
    type: String,
    description: "Sort field",
  })
  @ApiQuery({
    name: "sortOrder",
    required: false,
    type: String,
    description: "Sort order (asc/desc)",
  })
  @ApiResponse({ status: 200, description: "Persons retrieved successfully" })
  findAll(@Query() query: BaseQueryDto) {
    return this.personsService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get person by ID",
    description: "Retrieves a specific person by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the person",
  })
  @ApiResponse({
    status: 200,
    description: "Person retrieved successfully",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "number" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            birthDate: { type: "string", format: "date-time" },
            dni: { type: "string" },
            cuil: { type: "string" },
            gender: { type: "string" },
            maritalStatus: { type: "string" },
            information: { type: "string" },
            status: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Person not found",
  })
  findOne(@Param("id") id: string) {
    return this.personsService.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update person information",
    description: "Updates an existing person with the provided data.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the person to update",
  })
  @ApiBody({ type: UpdatePersonDto })
  @ApiResponse({
    status: 200,
    description: "Person updated successfully",
    schema: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "number" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            birthDate: { type: "string", format: "date-time" },
            dni: { type: "string" },
            cuil: { type: "string" },
            gender: { type: "string" },
            maritalStatus: { type: "string" },
            information: { type: "string" },
            status: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Person not found",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  update(@Param("id") id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personsService.update(+id, updatePersonDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete person",
    description: "Deletes a person by their unique identifier.",
  })
  @ApiParam({
    name: "id",
    type: "number",
    description: "Unique identifier of the person to delete",
  })
  @ApiResponse({
    status: 200,
    description: "Person deleted successfully",
    schema: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "Person not found",
  })
  remove(@Param("id") id: string) {
    return this.personsService.remove(+id);
  }
}
