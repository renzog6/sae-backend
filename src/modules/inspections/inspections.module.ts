// filepath: sae-backend/src/modules/inspections/inspections.module.ts
import { Module } from "@nestjs/common";
import { InspectionsService } from "./services/inspections.service";
import { InspectionsController } from "./controllers/inspections.controller";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [InspectionsController],
  providers: [InspectionsService],
  exports: [InspectionsService],
})
export class InspectionsModule {}
