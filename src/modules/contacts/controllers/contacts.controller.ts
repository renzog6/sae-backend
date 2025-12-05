// filepath: sae-backend/src/modules/contacts/controllers/contacts.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { BaseQueryDto } from "@common/dto";
import { ContactsService } from "../services/contacts.service";
import { CreateContactDto } from "../dto/create-contact.dto";
import { UpdateContactDto } from "../dto/update-contact.dto";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("contacts")
@Controller("contacts")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new contact" })
  @ApiResponse({ status: 201, description: "Contact created successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all contacts" })
  @ApiResponse({ status: 200, description: "Contacts retrieved successfully" })
  findAll(@Query() query: BaseQueryDto) {
    return this.contactsService.findAll(query);
  }

  @Get("company/:companyId(\\d+)")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get contacts by company ID" })
  @ApiResponse({ status: 200, description: "Contacts retrieved successfully" })
  findByCompany(
    @Param("companyId") companyId: string,
    @Query() query: BaseQueryDto
  ) {
    return this.contactsService.findByCompany(companyId, query);
  }

  @Get("person/:personId(\\d+)")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get contacts by person ID" })
  @ApiResponse({ status: 200, description: "Contacts retrieved successfully" })
  findByPerson(
    @Param("personId") personId: string,
    @Query() query: BaseQueryDto
  ) {
    return this.contactsService.findByPerson(personId, query);
  }

  @Get(":id(\\d+)")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a contact by ID" })
  @ApiResponse({ status: 200, description: "Contact retrieved successfully" })
  @ApiResponse({ status: 404, description: "Contact not found" })
  findOne(@Param("id") id: string) {
    return this.contactsService.findOne(id);
  }

  @Put(":id(\\d+)")
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a contact" })
  @ApiResponse({ status: 200, description: "Contact updated successfully" })
  @ApiResponse({ status: 404, description: "Contact not found" })
  update(@Param("id") id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(id, updateContactDto);
  }

  @Delete(":id(\\d+)")
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a contact" })
  @ApiResponse({ status: 200, description: "Contact deleted successfully" })
  @ApiResponse({ status: 404, description: "Contact not found" })
  remove(@Param("id") id: string) {
    return this.contactsService.remove(id);
  }
}
