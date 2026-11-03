// filepath: sae-backend/src/modules/equipment/equipment-transaction/equipment-transaction.module.ts
import { Module } from "@nestjs/common";
import { EquipmentTransactionsService } from "./equipment-transactions.service";
import { EquipmentTransactionsController } from "./equipment-transactions.controller";
import { PrismaModule } from "@prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [EquipmentTransactionsController],
  providers: [EquipmentTransactionsService],
  exports: [EquipmentTransactionsService],
})
export class EquipmentTransactionModule { }
