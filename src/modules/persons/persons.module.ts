// filepath: sae-backend/src/modules/persons/persons.module.ts
import { Module } from "@nestjs/common";
import { PrismaModule } from "@prisma/prisma.module";
import { PersonsService } from "./services/persons.service";
import { FamilyService } from "./services/family.service";
import { PersonsController } from "./controllers/persons.controller";
import { FamilyController } from "./controllers/family.controller";

@Module({
  imports: [PrismaModule],
  providers: [PersonsService, FamilyService],
  controllers: [PersonsController, FamilyController],
  exports: [PersonsService, FamilyService],
})
export class PersonsModule {}
