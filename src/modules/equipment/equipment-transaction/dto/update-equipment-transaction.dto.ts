import { PartialType } from "@nestjs/mapped-types";
import { CreateEquipmentTransactionDto } from "./create-equipment-transaction.dto";

export class UpdateEquipmentTransactionDto extends PartialType(CreateEquipmentTransactionDto) { }
