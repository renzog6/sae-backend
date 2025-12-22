// filepath: sae-backend/src/modules/validators/validators.module.ts
import { Module } from "@nestjs/common";
import { ValidatorsController } from "./validators.controller";
import { ValidatorsService } from "./validators.service";

@Module({
  providers: [ValidatorsService],
  controllers: [ValidatorsController],
  exports: [ValidatorsService],
})
export class ValidatorsModule {}
