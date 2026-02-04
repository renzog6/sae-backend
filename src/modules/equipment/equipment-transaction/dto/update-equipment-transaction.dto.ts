import { InputType, PartialType } from "@nestjs/graphql";
import { CreateEquipmentTransactionDto } from "./create-equipment-transaction.dto";

@InputType()
export class UpdateEquipmentTransactionDto extends PartialType(CreateEquipmentTransactionDto) { }
