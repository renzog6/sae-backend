//filepath: sae-backend/src/tires/tire-inspections/tire-inspections.module.ts
import { Module } from "@nestjs/common";
import { TireInspectionsService } from "./tire-inspections.service";
import { TireInspectionsController } from "./tire-inspections.controller";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
  controllers: [TireInspectionsController],
  providers: [TireInspectionsService],
  imports: [PrismaModule],
})
export class TireInspectionsModule {}
