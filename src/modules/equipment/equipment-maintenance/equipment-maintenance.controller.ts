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
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { EquipmentMaintenanceService } from "./equipment-maintenance.service";
import { CreateEquipmentMaintenanceDto } from "./dto/create-equipment-maintenance.dto";
import { EquipmentMaintenance } from "./entity/equipment-maintenance.entity";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("equipment-maintenance")
@Controller("equipment-maintenance")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EquipmentMaintenanceController extends BaseController<EquipmentMaintenance> {
  constructor(private readonly maintenanceService: EquipmentMaintenanceService) {
    super(maintenanceService, EquipmentMaintenance, "EquipmentMaintenance");
  }

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({
    summary: "Register new maintenance",
    description: "Creates a new equipment maintenance record.",
  })
  @ApiBody({ type: CreateEquipmentMaintenanceDto })
  @ApiResponse({
    status: 201,
    description: "Maintenance registered successfully",
  })
  override create(@Body() createEquipmentMaintenanceDto: CreateEquipmentMaintenanceDto) {
    return this.maintenanceService.create(createEquipmentMaintenanceDto);
  }
}
