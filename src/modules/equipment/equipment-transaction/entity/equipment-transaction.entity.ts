// filepath: sae-backend/src/modules/equipment/equipment-transaction/entity/equipment-transaction.entity.ts
import { ApiProperty } from "@nestjs/swagger";

export class EquipmentTransaction {
  @ApiProperty()
  id: number;

  @ApiProperty()
  equipmentId: number;

  @ApiProperty()
  companyId: number;

  @ApiProperty()
  type: string;

  @ApiProperty({ name: "transactionDate" })
  transactionDate: Date;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  currency: string;

  @ApiProperty({ required: false })
  exchangeRate?: number;

  @ApiProperty({ required: false })
  observation?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
