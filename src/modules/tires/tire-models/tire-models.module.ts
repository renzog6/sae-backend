//filepath: sae-backend/src/tires/tire-models/tire-models.module.ts
import { Module } from "@nestjs/common";
import { TireModelsService } from "./tire-models.service";
import { TireModelsController } from "./tire-models.controller";
import { TireModelsResolver } from "./tire-models.resolver";
import { PrismaService } from "@prisma/prisma.service";

@Module({
  controllers: [TireModelsController],
  providers: [TireModelsService, TireModelsResolver, PrismaService],
  exports: [TireModelsService],
})
export class TireModelsModule { }
