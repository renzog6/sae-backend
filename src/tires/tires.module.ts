//filepath: sae-backend/src/tires/tires.module.ts
import { Module } from "@nestjs/common";
import { TiresService } from "./tires.service";
import { TiresController } from "./tires.controller";
import { PrismaService } from "../prisma/prisma.service";
import { TireAssignmentsModule } from './tire-assignments/tire-assignments.module';
import { TireRotationsModule } from './tire-rotations/tire-rotations.module';
import { TireRecapsModule } from './tire-recaps/tire-recaps.module';
import { TireInspectionsModule } from './tire-inspections/tire-inspections.module';
import { TireReportsModule } from './tire-reports/tire-reports.module';

@Module({
  controllers: [TiresController],
  providers: [TiresService, PrismaService],
  exports: [TiresService],
  imports: [TireAssignmentsModule, TireRotationsModule, TireRecapsModule, TireInspectionsModule, TireReportsModule],
})
export class TiresModule {}
