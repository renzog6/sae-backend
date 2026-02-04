import { Module } from "@nestjs/common";
import { TireInspectionsService } from "./tire-inspections.service";
import { TireInspectionsController } from "./tire-inspections.controller";
import { PrismaService } from "@prisma/prisma.service";
import { TireAssignmentEventsService } from "@modules/tires/tire-assignments/tire-events.service";
import { TireInspectionsResolver } from "./tire-inspections.resolver";

@Module({
  controllers: [TireInspectionsController],
  providers: [
    TireInspectionsService,
    TireAssignmentEventsService,
    PrismaService,
    TireInspectionsResolver,
  ],
  exports: [TireInspectionsService],
})
export class TireInspectionsModule { }
