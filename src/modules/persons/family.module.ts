// filepath: sae-backend/src/modules/persons/family/family.module.ts
import { Module } from "@nestjs/common";
import { FamilyService } from "./services/family.service";
import { FamilyController } from "./controllers/family.controller";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [FamilyController],
  providers: [FamilyService],
  exports: [FamilyService],
})
export class FamilyModule {}
