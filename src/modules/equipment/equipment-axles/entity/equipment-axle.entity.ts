import { ObjectType, Field, Int, registerEnumType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { EquipmentAxle as PrismaEquipmentAxle, AxleType } from "@prisma/client";
import { Equipment } from "../../entities/equipment.entity";
import { TirePositionConfig } from "../../../tires/entities/tire-position-config.entity";

registerEnumType(AxleType, {
    name: "AxleType",
});

@ObjectType()
export class EquipmentAxle implements Partial<PrismaEquipmentAxle> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field(() => Int)
    @ApiProperty()
    equipmentId: number;

    @Field(() => Int)
    @ApiProperty()
    order: number;

    @Field(() => AxleType)
    @ApiProperty({ enum: AxleType })
    axleType: AxleType;

    @Field(() => Int)
    @ApiProperty()
    wheelCount: number;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    description?: string;

    @Field(() => Equipment, { nullable: true })
    equipment?: Equipment;

    @Field(() => [TirePositionConfig], { nullable: true })
    tirePositions?: TirePositionConfig[];
}
