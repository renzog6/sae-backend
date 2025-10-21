//file: sae-backend/src/tires/tire-assignments/tire-assignments.module.ts
import { Module } from "@nestjs/common";
import { TireAssignmentsService } from "./tire-assignments.service";
import { TireAssignmentsController } from "./tire-assignments.controller";
import { TireAssignmentEventsService } from "./tire-events.service";
import { PrismaService } from "../../prisma/prisma.service";

@Module({
  controllers: [TireAssignmentsController],
  providers: [TireAssignmentsService, TireAssignmentEventsService, PrismaService],
  exports: [TireAssignmentsService],
})
export class TireAssignmentsModule {}
