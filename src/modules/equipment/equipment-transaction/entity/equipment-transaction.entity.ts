import { ApiProperty } from "@nestjs/swagger";
import { EquipmentTransactionType, Currency } from "@prisma/client";
import { Equipment } from "../../entities/equipment.entity";
import { Company } from "../../../companies/entities/company.entity";

export class EquipmentTransaction {
  @ApiProperty()
  id: number;

  @ApiProperty()
  equipmentId: number;

  @ApiProperty()
  companyId: number;

  @ApiProperty()
  type: EquipmentTransactionType;

  @ApiProperty({ name: "transactionDate" })
  transactionDate: Date;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  currency: Currency;

  @ApiProperty({ required: false })
  exchangeRate?: number;

  @ApiProperty({ required: false })
  observation?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  equipment?: Equipment;

  @ApiProperty({ required: false })
  company?: Company;
}
