import { Resolver } from "@nestjs/graphql";
import { EquipmentTransactionsService } from "./equipment-transactions.service";
import { EquipmentTransaction } from "./entity/equipment-transaction.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { CreateEquipmentTransactionDto } from "./dto/create-equipment-transaction.dto";
import { UpdateEquipmentTransactionDto } from "./dto/update-equipment-transaction.dto";

@Resolver(() => EquipmentTransaction)
export class EquipmentTransactionsResolver extends BaseResolver(EquipmentTransaction, {
    createInput: CreateEquipmentTransactionDto,
    updateInput: UpdateEquipmentTransactionDto,
}) {
    constructor(private readonly equipmentTransactionsService: EquipmentTransactionsService) {
        super(equipmentTransactionsService);
    }
}
