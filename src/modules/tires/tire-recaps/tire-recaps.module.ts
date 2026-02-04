import { Module } from "@nestjs/common";
import { TireRecapsService } from "./tire-recaps.service";
import { TireRecapsController } from "./tire-recaps.controller";
import { PrismaService } from "@prisma/prisma.service";
import { TireAssignmentEventsService } from "@modules/tires/tire-assignments/tire-events.service";
import { TireRecapsResolver } from "./tire-recaps.resolver";

@Module({
  controllers: [TireRecapsController],
  providers: [
    TireRecapsService,
    PrismaService,
    TireAssignmentEventsService,
    TireRecapsResolver,
  ],
  exports: [TireRecapsService],
})
export class TireRecapsModule { }
