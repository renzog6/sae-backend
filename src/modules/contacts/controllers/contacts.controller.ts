import { BaseController } from "@common/controllers/base.controller";
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { ContactsService } from "../services/contacts.service";
import { CreateContactDto } from "../dto/create-contact.dto";
import { Contact } from "../entities/contact.entity";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";
import { Put, ParseIntPipe } from "@nestjs/common";
import { UpdateContactDto } from "../dto/update-contact.dto";

@ApiTags("contacts")
@Controller("contacts")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ContactsController extends BaseController<Contact> {
  constructor(private readonly contactsService: ContactsService) {
    super(contactsService, Contact, "Contact");
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Create a new contact" })
  @ApiResponse({ status: 201, description: "Contact created successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  override create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get("person/:personId")
  @ApiOperation({
    summary: "Get contacts by person",
    description: "Retrieves all contacts associated with a specific person.",
  })
  @ApiParam({
    name: "personId",
    type: "number",
    description: "Unique identifier of the person",
  })
  @ApiResponse({ status: 200, description: "Contacts retrieved successfully" })
  @ApiResponse({ status: 404, description: "Person not found" })
  byPerson(@Param("personId") personId: string) {
    return this.contactsService.findByPerson(+personId);
  }

  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateContactDto) {
    return super.update(id, dto);
  }
}
