//filepath: sae-backend/src/modules/catalogs/catalogs.module.ts
import { Module } from "@nestjs/common";
import { BrandsModule } from "./brands/brands.module";
import { UnitsModule } from "./units/units.module";

@Module({
  imports: [BrandsModule, UnitsModule],
})
export class CatalogsModule {}
