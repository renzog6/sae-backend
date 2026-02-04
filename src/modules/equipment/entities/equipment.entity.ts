import { ObjectType, Field, Int, registerEnumType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  Equipment as PrismaEquipment,
  EquipmentStatus,
  FuelType,
} from "@prisma/client";
import { Company } from "@modules/companies/entities/company.entity";
import { EquipmentCategory } from "../equipment-categories/entity/equipment-category.entity";
import { EquipmentType } from "../equipment-types/entity/equipment-type.entity";
import { EquipmentModel } from "../equipment-models/entity/equipment-model.entity";
import { EquipmentAxle } from "../equipment-axles/entity/equipment-axle.entity";
import { EquipmentMaintenance } from "../equipment-maintenance/entity/equipment-maintenance.entity";
import { EquipmentTransaction } from "../equipment-transaction/entity/equipment-transaction.entity";

// Register enums for GraphQL
registerEnumType(EquipmentStatus, { name: "EquipmentStatus" });
registerEnumType(FuelType, { name: "FuelType" });

@ObjectType()
export class Equipment implements Partial<PrismaEquipment> {
  @Field(() => Int)
  @ApiProperty()
  id: number;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  internalCode?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  name?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  description?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  observation?: string;

  @Field(() => Int, { nullable: true })
  @ApiProperty({ required: false })
  year?: number;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  licensePlate?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  chassis?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  engine?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  color?: string;

  @Field(() => FuelType, { nullable: true })
  @ApiProperty({ enum: FuelType })
  fuelType?: FuelType;

  @Field(() => EquipmentStatus)
  @ApiProperty({ enum: EquipmentStatus })
  status: EquipmentStatus;

  @Field(() => Int, { nullable: true })
  @ApiProperty({ required: false })
  companyId?: number;

  @Field(() => Company, { nullable: true })
  company?: Company;

  @Field(() => Int, { nullable: true })
  @ApiProperty({ required: false })
  categoryId?: number;

  @Field(() => EquipmentCategory, { nullable: true })
  category?: EquipmentCategory;

  @Field(() => Int, { nullable: true })
  @ApiProperty({ required: false })
  typeId?: number;

  @Field(() => EquipmentType, { nullable: true })
  type?: EquipmentType;

  @Field(() => Int, { nullable: true })
  @ApiProperty({ required: false })
  modelId?: number;

  @Field(() => EquipmentModel, { nullable: true })
  model?: EquipmentModel;

  @Field()
  @ApiProperty()
  isActive: boolean;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  deletedAt?: Date;

  @Field()
  @ApiProperty()
  createdAt: Date;

  @Field()
  @ApiProperty()
  updatedAt: Date;

  // Relations
  @Field(() => [EquipmentAxle], { nullable: true })
  axles?: EquipmentAxle[];

  @Field(() => [EquipmentMaintenance], { nullable: true })
  maintenances?: EquipmentMaintenance[];

  @Field(() => [EquipmentTransaction], { nullable: true })
  transactions?: EquipmentTransaction[];
}
