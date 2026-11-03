import { PartialType } from "@nestjs/swagger";
import { CreateEquipmentTransactionDto } from "./create-equipment-transaction.dto";

export class UpdateEquipmentTransactionDto extends PartialType(CreateEquipmentTransactionDto) { }
