import { Module } from "@nestjs/common";
import { TireEventsService } from "./tire-events.service";
import { TireEventsController } from "./tire-events.controller";
import { TireEventsResolver } from "./tire-events.resolver";
import { PrismaService } from "@prisma/prisma.service";

@Module({
  controllers: [TireEventsController],
  providers: [TireEventsService, TireEventsResolver, PrismaService],
  exports: [TireEventsService],
})
export class TireEventsModule { }
