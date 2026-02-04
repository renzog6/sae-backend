import { ObjectType, Field, Int, Float, registerEnumType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { EquipmentTransactionType, Currency } from "@prisma/client";
import { Equipment } from "../../entities/equipment.entity";
import { Company } from "../../../companies/entities/company.entity";

registerEnumType(EquipmentTransactionType, {
  name: "EquipmentTransactionType",
});

registerEnumType(Currency, {
  name: "Currency",
});

@ObjectType()
export class EquipmentTransaction {
  @Field(() => Int)
  @ApiProperty()
  id: number;

  @Field(() => Int)
  @ApiProperty()
  equipmentId: number;

  @Field(() => Int)
  @ApiProperty()
  companyId: number;

  @Field(() => EquipmentTransactionType)
  @ApiProperty()
  type: EquipmentTransactionType;

  @Field()
  @ApiProperty({ name: "transactionDate" })
  transactionDate: Date;

  @Field(() => Float)
  @ApiProperty()
  amount: number;

  @Field(() => Currency)
  @ApiProperty()
  currency: Currency;

  @Field(() => Float, { nullable: true })
  @ApiProperty({ required: false })
  exchangeRate?: number;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  observation?: string;

  @Field()
  @ApiProperty()
  createdAt: Date;

  @Field()
  @ApiProperty()
  updatedAt: Date;

  @Field(() => Equipment, { nullable: true })
  @ApiProperty({ required: false })
  equipment?: Equipment;

  @Field(() => Company, { nullable: true })
  @ApiProperty({ required: false })
  company?: Company;
}
