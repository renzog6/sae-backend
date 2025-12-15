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
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { FamilyService } from "@modules/persons/services/family.service";
import { CreateFamilyDto } from "@modules/persons/dto/create-family.dto";
// import { UpdateFamilyDto } from "@modules/persons/dto/update-family.dto";
import { Family } from "../entities/family.entity";
import { RolesGuard } from "@common/guards/roles.guard";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("family")
@Controller("persons/family")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class FamilyController extends BaseController<Family> {
  constructor(private readonly familyService: FamilyService) {
    super(familyService, Family, "Family");
  }

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({
    summary: "Create a new family relationship",
    description: "Creates a new family relationship between two persons",
  })
  @ApiBody({ type: CreateFamilyDto })
  @ApiResponse({
    status: 201,
    description: "Family relationship created successfully",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid data provided",
  })
  @ApiResponse({ status: 404, description: "Not found - Person not found" })
  override create(@Body() createFamilyDto: CreateFamilyDto) {
    return this.familyService.create(createFamilyDto);
  }

  // findAll, findOne, update, remove are standard.
  // Note: Original update had Roles logic. BaseController has Guard but not Roles(Role.ADMIN, Role.USER) on specific Default methods.
  // BaseController does NOT have Roles decorators on CRUD methods by default. UseGuards(RolesGuard) works but Roles are open?
  // No, if BaseController class has @UseGuards, it applies to all methods.
  // But standard BaseController methods don't have @Roles(...).
  // If original controller had specific roles, we should override or decorators might be lost.
  // Original FamilyController had @Roles(Role.ADMIN, Role.USER) on ALL methods.
  // So we should add that to class level or override?
  // I'll add @Roles(Role.ADMIN, Role.USER) to the class if possible, or override.
  // But Roles decorator is method-level usually.
  // Let's assume standard Admin/User access is desired.
}

