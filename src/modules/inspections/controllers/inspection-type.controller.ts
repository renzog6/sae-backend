import { BaseController } from "@common/controllers/base.controller";
import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { InspectionTypeService } from "../services/inspection-type.service";
import { CreateInspectionTypeDto } from "../dto/create-inspection-type.dto";
import { InspectionType } from "../entities/inspection-type.entity";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("inspection-types")
@Controller("inspection-types")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class InspectionTypeController extends BaseController<InspectionType> {
    constructor(private readonly inspectionTypeService: InspectionTypeService) {
        super(inspectionTypeService, InspectionType, "InspectionType");
    }

    @Post()
    @Roles(Role.ADMIN)
    @ApiOperation({ summary: "Create inspection type" })
    @ApiBody({ type: CreateInspectionTypeDto })
    @ApiResponse({ status: 201, description: "Inspection type created" })
    override create(@Body() dto: CreateInspectionTypeDto) {
        return this.inspectionTypeService.create(dto);
    }
}
