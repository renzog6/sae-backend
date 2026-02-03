import { BaseController } from "@common/controllers/base.controller";
import {
  Controller,
  Post,
  Body,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { ContactsService } from "../services/contacts.service";
import { CreateContactDto } from "../dto/create-contact.dto";
import { Contact } from "../entities/contact.entity";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("contacts")
@Controller("contacts")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ContactsController extends BaseController<Contact> {
  constructor(private readonly contactsService: ContactsService) {
    super(contactsService, Contact, "Contact");
  }

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: "Create a new contact" })
  @ApiResponse({ status: 201, description: "Contact created successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  override create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

}

