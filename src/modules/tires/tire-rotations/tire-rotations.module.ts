import { Module } from "@nestjs/common";
import { TireRotationsService } from "./tire-rotations.service";
import { TireRotationsController } from "./tire-rotations.controller";
import { PrismaService } from "@prisma/prisma.service";
import { TireAssignmentEventsService } from "@modules/tires/tire-assignments/tire-events.service";
import { TireRotationsResolver } from "./tire-rotations.resolver";

@Module({
  controllers: [TireRotationsController],
  providers: [
    TireRotationsService,
    PrismaService,
    TireAssignmentEventsService,
    TireRotationsResolver,
  ],
  exports: [TireRotationsService],
})
export class TireRotationsModule { }
