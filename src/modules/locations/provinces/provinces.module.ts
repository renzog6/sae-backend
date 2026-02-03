// filepath: sae-backend/src/modules/locations/provinces/provinces.module.ts
import { Module } from "@nestjs/common";
import { ProvincesController } from "./provinces.controller";
import { ProvincesService } from "./provinces.service";
import { PrismaModule } from "@prisma/prisma.module";
import { ProvincesResolver } from "./provinces.resolver";

@Module({
  imports: [PrismaModule],
  controllers: [ProvincesController],
  providers: [ProvincesService, ProvincesResolver],
  exports: [ProvincesService],
})
export class ProvincesModule { }
