// filepath: sae-backend/src/modules/equipment/equipment-transaction/equipment-transactions.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { EquipmentTransactionsService } from "./equipment-transactions.service";
import { CreateEquipmentTransactionDto } from "./dto/create-equipment-transaction.dto";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { Roles, Role } from "@common/decorators/roles.decorator";

@ApiTags("equipment-transactions")
@Controller("equipment-transactions")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EquipmentTransactionsController {
  constructor(
    private readonly equipmentTransactionsService: EquipmentTransactionsService
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: "Create a new equipment transaction",
    description:
      "Creates a new equipment transaction (purchase or sale) for an equipment.",
  })
  @ApiBody({ type: CreateEquipmentTransactionDto })
  @ApiResponse({
    status: 201,
    description: "Equipment transaction created successfully",
  })
  async create(
    @Body() createEquipmentTransactionDto: CreateEquipmentTransactionDto
  ) {
    return this.equipmentTransactionsService.create(
      createEquipmentTransactionDto
    );
  }

  @Get("by-equipment/:equipmentId")
  @ApiOperation({ summary: "Get equipment transactions by equipment" })
  @ApiParam({ name: "equipmentId", type: "number" })
  async findByEquipment(
    @Param("equipmentId", ParseIntPipe) equipmentId: number
  ) {
    return this.equipmentTransactionsService.findByEquipment(equipmentId);
  }
}
