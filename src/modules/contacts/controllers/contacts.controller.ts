import { BaseController } from "@common/controllers/base.controller";
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
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
// import { UpdateContactDto } from "../dto/update-contact.dto";
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

  // findAll and findOne are standard now. 
  // BaseController uses 'id' as number. ContactsService now uses 'number'. 
  // BaseController.findOne(id) calls service.findOne(id). 
  // BaseController.create(dto) calls service.create(dto).
  // BaseController.update(id, dto) calls service.update(id, dto).
  // BaseController.remove(id) calls service.remove(id).

  // ContactsController override `create` had specific decorators. I kept them above.

  // Custom methods:

  @Get("company/:companyId(\\d+)")
  @ApiOperation({ summary: "Get contacts by company ID" })
  @ApiResponse({ status: 200, description: "Contacts retrieved successfully" })
  findByCompany(
    @Param("companyId") companyId: string,
    @Query() query: BaseQueryDto
  ) {
    return this.contactsService.findByCompany(companyId, query);
  }

  @Get("person/:personId(\\d+)")
  @ApiOperation({ summary: "Get contacts by person ID" })
  @ApiResponse({ status: 200, description: "Contacts retrieved successfully" })
  findByPerson(
    @Param("personId") personId: string,
    @Query() query: BaseQueryDto
  ) {
    return this.contactsService.findByPerson(personId, query);
  }
}

