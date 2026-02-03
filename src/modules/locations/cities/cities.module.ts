// filepath: sae-backend/src/modules/locations/cities/cities.module.ts
import { Module } from "@nestjs/common";
import { CitiesController } from "./cities.controller";
import { CitiesService } from "./cities.service";
import { PrismaModule } from "@prisma/prisma.module";
import { CitiesResolver } from "./cities.resolver";

@Module({
  imports: [PrismaModule],
  controllers: [CitiesController],
  providers: [CitiesService, CitiesResolver],
  exports: [CitiesService],
})
export class CitiesModule { }
