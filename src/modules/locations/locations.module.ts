// filepath: sae-backend/src/modules/locations/locations.module.ts
import { Module } from "@nestjs/common";
import { PrismaModule } from "@prisma/prisma.module";
import { AddressesModule } from "./addresses/addresses.module";
import { CitiesModule } from "./cities/cities.module";
import { CountriesModule } from "./countries/countries.module";
import { ProvincesModule } from "./provinces/provinces.module";

@Module({
  imports: [
    PrismaModule,
    AddressesModule,
    CitiesModule,
    CountriesModule,
    ProvincesModule,
  ],
})
export class LocationsModule {}
