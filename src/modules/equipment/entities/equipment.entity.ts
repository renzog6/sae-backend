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

export class Equipment implements Partial<PrismaEquipment> {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  internalCode?: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  observation?: string;

  @ApiProperty({ required: false })
  year?: number;

  @ApiProperty({ required: false })
  licensePlate?: string;

  @ApiProperty({ required: false })
  chassis?: string;

  @ApiProperty({ required: false })
  engine?: string;

  @ApiProperty({ required: false })
  color?: string;

  @ApiProperty({ enum: FuelType })
  fuelType?: FuelType;

  @ApiProperty({ enum: EquipmentStatus })
  status: EquipmentStatus;

  @ApiProperty({ required: false })
  companyId?: number;

  company?: Company;

  @ApiProperty({ required: false })
  categoryId?: number;

  category?: EquipmentCategory;

  @ApiProperty({ required: false })
  typeId?: number;

  type?: EquipmentType;

  @ApiProperty({ required: false })
  modelId?: number;

  model?: EquipmentModel;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty({ required: false })
  deletedAt?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  // Relations
  axles?: EquipmentAxle[];

  maintenances?: EquipmentMaintenance[];

  transactions?: EquipmentTransaction[];
}
