import { ApiProperty } from "@nestjs/swagger";
import { EquipmentAxle as PrismaEquipmentAxle, AxleType } from "@prisma/client";

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
}
