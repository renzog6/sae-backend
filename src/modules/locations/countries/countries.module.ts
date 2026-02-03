// filepath: sae-backend/src/modules/locations/countries/countries.module.ts
import { Module } from "@nestjs/common";
import { CountriesController } from "./countries.controller";
import { CountriesService } from "./countries.service";
import { PrismaModule } from "@prisma/prisma.module";
import { CountriesResolver } from "./countries.resolver";

@Module({
  imports: [PrismaModule],
  controllers: [CountriesController],
  providers: [CountriesService, CountriesResolver],
  exports: [CountriesService],
})
export class CountriesModule { }
