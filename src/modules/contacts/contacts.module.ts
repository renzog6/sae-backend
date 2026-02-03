// filepath: sae-backend/src/modules/contacts/contacts.module.ts
import { Module } from "@nestjs/common";
import { ContactsService } from "./services/contacts.service";
import { ContactsController } from "./controllers/contacts.controller";
import { PrismaModule } from "@prisma/prisma.module";

import { ContactsResolver } from "./contacts.resolver";

@Module({
  imports: [PrismaModule],
  controllers: [ContactsController],
  providers: [ContactsService, ContactsResolver],
  exports: [ContactsService],
})
export class ContactsModule { }
