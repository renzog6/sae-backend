// filepath: sae-backend/src/modules/persons/persons.module.ts
import { Module } from "@nestjs/common";
import { PersonsService } from "./services/persons.service";
import { PersonsController } from "./controllers/persons.controller";
import { FamilyModule } from "./family/family.module";

@Module({
  controllers: [PersonsController],
  providers: [PersonsService],
  imports: [FamilyModule],
})
export class PersonsModule {}
