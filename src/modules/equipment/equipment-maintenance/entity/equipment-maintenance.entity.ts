import { ObjectType, Field, Int, Float, registerEnumType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { EquipmentMaintenance as PrismaEquipmentMaintenance, MaintenanceType } from "@prisma/client";
import { Equipment } from "../../entities/equipment.entity";

registerEnumType(MaintenanceType, {
    name: "MaintenanceType",
});

@ObjectType()
export class EquipmentMaintenance implements Partial<PrismaEquipmentMaintenance> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field(() => MaintenanceType)
    @ApiProperty({ enum: MaintenanceType })
    type: MaintenanceType;

    @Field()
    @ApiProperty()
    description: string;

    @Field(() => Float, { nullable: true })
    @ApiProperty({ required: false })
    cost?: any; // Prisma Decimal, uses string or number or Decimal

    @Field()
    @ApiProperty()
    startDate: Date;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    endDate?: Date;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    technician?: string;

    @Field(() => Boolean, { nullable: true })
    warranty?: boolean;

    @Field(() => Int)
    @ApiProperty()
    equipmentId: number;

    @Field(() => Equipment, { nullable: true })
    equipment?: Equipment;

    @Field()
    @ApiProperty()
    createdAt: Date;

    @Field()
    @ApiProperty()
    updatedAt: Date;
}