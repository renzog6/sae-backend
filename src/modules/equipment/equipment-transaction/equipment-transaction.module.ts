// filepath: sae-backend/src/modules/equipment/equipment-transaction/equipment-transaction.module.ts
import { Module, forwardRef } from "@nestjs/common";
import { EquipmentTransactionsService } from "./equipment-transactions.service";
import { EquipmentTransactionsController } from "./equipment-transactions.controller";
import { PrismaModule } from "@prisma/prisma.module";
import { HistoryModule } from "@modules/history/history.module";

@Module({
  imports: [PrismaModule, forwardRef(() => HistoryModule)],
  controllers: [EquipmentTransactionsController],
  providers: [EquipmentTransactionsService],
  exports: [EquipmentTransactionsService],
})
export class EquipmentTransactionModule {}
