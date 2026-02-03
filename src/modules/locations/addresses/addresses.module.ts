// filepath: sae-backend/src/modules/locations/addresses/addresses.module.ts
import { Module } from "@nestjs/common";
import { AddressesService } from "./addresses.service";
import { AddressesController } from "./addresses.controller";
import { AddressesResolver } from "./addresses.resolver";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [AddressesController],
  providers: [AddressesService, AddressesResolver],
  exports: [AddressesService],
})
export class AddressesModule { }
