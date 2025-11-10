// filepath: sae-backend/src/modules/documents/documents.module.ts
import { Module } from "@nestjs/common";
import { DocumentsService } from "./services/documents.service";
import { DocumentsController } from "./controllers/documents.controller";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
