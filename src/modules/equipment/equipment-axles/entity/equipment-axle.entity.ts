import { ApiProperty } from "@nestjs/swagger";
import { EquipmentAxle as PrismaEquipmentAxle, AxleType } from "@prisma/client";
import { Equipment } from "../../entities/equipment.entity";
import { TirePositionConfig } from "../../../tires/entities/tire-position-config.entity";

export class EquipmentAxle implements Partial<PrismaEquipmentAxle> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    equipmentId: number;

    @ApiProperty()
    order: number;

    @ApiProperty({ enum: AxleType })
    axleType: AxleType;

    @ApiProperty()
    wheelCount: number;

    @ApiProperty({ required: false })
    description?: string;

    equipment?: Equipment;

    tirePositions?: TirePositionConfig[];
}
