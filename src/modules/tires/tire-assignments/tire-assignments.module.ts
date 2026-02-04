import { Module } from "@nestjs/common";
import { TireAssignmentsService } from "./tire-assignments.service";
import { TireAssignmentsController } from "./tire-assignments.controller";
import { TireAssignmentEventsService } from "./tire-events.service";
import { PrismaService } from "@prisma/prisma.service";
import { TireAssignmentsResolver } from "./tire-assignments.resolver";

@Module({
  controllers: [TireAssignmentsController],
  providers: [
    TireAssignmentsService,
    TireAssignmentEventsService,
    PrismaService,
    TireAssignmentsResolver,
  ],
  exports: [TireAssignmentsService],
})
export class TireAssignmentsModule { }
