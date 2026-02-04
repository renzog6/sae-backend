// filepath: sae-backend/src/modules/inspections/inspections.module.ts
import { Module } from "@nestjs/common";
import { InspectionsService } from "./services/inspections.service";
import { InspectionsController } from "./controllers/inspections.controller";
import { InspectionsResolver } from "./inspections.resolver";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [InspectionsController],
  providers: [InspectionsService, InspectionsResolver],
  exports: [InspectionsService],
})
export class InspectionsModule { }
