//filepath: sae-backend/src/tires/tire-inspections/tire-inspections.module.ts
import { Module } from "@nestjs/common";
import { TireInspectionsService } from "./tire-inspections.service";
import { TireInspectionsController } from "./tire-inspections.controller";
import { PrismaService } from "../../prisma/prisma.service";
import { TireAssignmentEventsService } from "../tire-assignments/tire-events.service";

@Module({
  controllers: [TireInspectionsController],
  providers: [
    TireInspectionsService,
    TireAssignmentEventsService,
    PrismaService,
  ],
  exports: [TireInspectionsService],
})
export class TireInspectionsModule {}
