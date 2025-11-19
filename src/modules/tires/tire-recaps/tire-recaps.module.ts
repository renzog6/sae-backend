//file: sae-backend/src/tires/tire-recaps/tire-recaps.module.ts
import { Module } from "@nestjs/common";
import { TireRecapsService } from "./tire-recaps.service";
import { TireRecapsController } from "./tire-recaps.controller";
import { PrismaService } from "@prisma/prisma.service";
import { TireAssignmentEventsService } from "@modules/tires/tire-assignments/tire-events.service"; // reutilizamos el service de eventos

@Module({
  controllers: [TireRecapsController],
  providers: [TireRecapsService, PrismaService, TireAssignmentEventsService],
  exports: [TireRecapsService],
})
export class TireRecapsModule {}
