import { Module } from "@nestjs/common";
import { BrandsService } from "./brands.service";
import { BrandsController } from "./brands.controller";
import { BrandsResolver } from "./brands.resolver";

@Module({
  controllers: [BrandsController],
  providers: [BrandsService, BrandsResolver],
})
export class BrandsModule { }
