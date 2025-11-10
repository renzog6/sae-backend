//filepath: sae-backend/src/tires/tire-assignments/tire-assignments.controller.ts
import { Controller, Post, Body, Put, Param, Get, Query } from "@nestjs/common";
import { TireAssignmentsService } from "./tire-assignments.service";
import { MountTireDto } from "./dto/mount-tire.dto";
import { UnmountTireDto } from "./dto/unmount-tire.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("tire-assignments")
@Controller("tires/assignments")
export class TireAssignmentsController {
  constructor(private readonly svc: TireAssignmentsService) {}

  @Post("mount")
  @ApiOperation({ summary: "Mount a tire to an equipment (create assignment)" })
  async mount(@Body() dto: MountTireDto) {
    // si tenes auth, extrae userId del request y pásalo al service
    return this.svc.mount(dto /*, userId */);
  }

  @Put("unmount")
  @ApiOperation({ summary: "Unmount a tire (close assignment)" })
  async unmount(@Body() dto: UnmountTireDto) {
    return this.svc.unmount(dto /*, userId */);
  }

  @Get("tire/:tireId")
  @ApiOperation({ summary: "Get assignments history for a tire" })
  async history(@Param("tireId") tireId: string) {
    return this.svc.findByTire(+tireId);
  }

  @Get("open")
  @ApiOperation({ summary: "Get open assignments" })
  async open(@Query("equipmentId") equipmentId?: string) {
    if (equipmentId) {
      return this.svc.findOpenAssignmentsByEquipment(+equipmentId);
    }
    return this.svc.findOpenAssignments();
  }
}
