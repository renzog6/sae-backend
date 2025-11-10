// filepath: sae-backend/src/modules/tires/tire-events/tire-events.module.ts
import { Module } from "@nestjs/common";
import { TireEventsService } from "./tire-events.service";
import { TireEventsController } from "./tire-events.controller";
import { PrismaService } from "@prisma/prisma.service";

@Module({
  controllers: [TireEventsController],
  providers: [TireEventsService, PrismaService],
  exports: [TireEventsService],
})
export class TireEventsModule {}
