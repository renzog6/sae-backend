//filepath: sae-backend/src/tires/tire-rotations/tire-rotations.module.ts
import { Module } from "@nestjs/common";
import { TireRotationsService } from "./tire-rotations.service";
import { TireRotationsController } from "./tire-rotations.controller";
import { PrismaService } from "@prisma/prisma.service";
import { TireAssignmentEventsService } from "@modules/tires/tire-assignments/tire-events.service";

@Module({
  controllers: [TireRotationsController],
  providers: [TireRotationsService, PrismaService, TireAssignmentEventsService],
  exports: [TireRotationsService],
})
export class TireRotationsModule {}
