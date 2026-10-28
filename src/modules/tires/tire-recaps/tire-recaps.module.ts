import { Module } from "@nestjs/common";
import { TireRecapsService } from "./tire-recaps.service";
import { TireRecapsController } from "./tire-recaps.controller";
import { PrismaService } from "@prisma/prisma.service";
import { TireAssignmentEventsService } from "@modules/tires/tire-assignments/tire-events.service";

@Module({
  controllers: [TireRecapsController],
  providers: [
    TireRecapsService,
    PrismaService,
    TireAssignmentEventsService,
  ],
  exports: [TireRecapsService],
})
export class TireRecapsModule { }
