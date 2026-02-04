import { Module } from "@nestjs/common";
import { TirePositionsService } from "./tire-positions.service";
import { TirePositionsController } from "./tire-positions.controller";
import { TirePositionsResolver } from "./tire-positions.resolver";
import { PrismaService } from "@prisma/prisma.service";

@Module({
  controllers: [TirePositionsController],
  providers: [TirePositionsService, TirePositionsResolver, PrismaService],
  exports: [TirePositionsService],
})
export class TirePositionsModule { }
