// filepath: sae-backend/src/modules/tires/tires.module.ts
import { Module } from "@nestjs/common";
import { TiresService } from "./tires.service";
import { TiresController } from "./tires.controller";
import { PrismaService } from "@prisma/prisma.service";
import { TireAssignmentsModule } from "./tire-assignments/tire-assignments.module";
import { TireRotationsModule } from "./tire-rotations/tire-rotations.module";
import { TireRecapsModule } from "./tire-recaps/tire-recaps.module";
import { TireInspectionsModule } from "./tire-inspections/tire-inspections.module";
import { TireReportsModule } from "./tire-reports/tire-reports.module";
import { TireSizesModule } from "./tire-sizes/tire-sizes.module";
import { TireSizesController } from "./tire-sizes/tire-sizes.controller";
import { TireModelsModule } from "./tire-models/tire-models.module";
import { TireModelsController } from "./tire-models/tire-models.controller";
import { TireAssignmentsController } from "./tire-assignments/tire-assignments.controller";
import { TireRotationsController } from "./tire-rotations/tire-rotations.controller";
import { TireRecapsController } from "./tire-recaps/tire-recaps.controller";
import { TireReportsController } from "./tire-reports/tire-reports.controller";
import { TireInspectionsController } from "./tire-inspections/tire-inspections.controller";
import { TireEventsModule } from "./tire-events/tire-events.module";
import { TireEventsController } from "./tire-events/tire-events.controller";
import { TirePositionsModule } from "./tire-positions/tire-positions.module";
import { TirePositionsController } from "./tire-positions/tire-positions.controller";

@Module({
  controllers: [
    TireSizesController,
    TireModelsController,
    TireAssignmentsController,
    TireRotationsController,
    TireRecapsController,
    TireInspectionsController,
    TireReportsController,
    TireEventsController,
    TirePositionsController,
    TiresController,
  ],
  providers: [TiresService, PrismaService],
  exports: [TiresService],
  imports: [
    TireAssignmentsModule,
    TireRotationsModule,
    TireRecapsModule,
    TireInspectionsModule,
    TireReportsModule,
    TireSizesModule,
    TireModelsModule,
    TireEventsModule,
    TirePositionsModule,
  ],
})
export class TiresModule {}
