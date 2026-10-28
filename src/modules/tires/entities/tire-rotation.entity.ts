import { ApiProperty } from "@nestjs/swagger";
import { TireRotation as PrismaTireRotation, TirePosition } from "@prisma/client";
import { Tire } from "../entity/tire.entity";

export class TireRotation implements Partial<PrismaTireRotation> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    tireId: number;

    tire?: Tire;

    @ApiProperty({ required: false })
    fromEquipmentId?: number;

    @ApiProperty({ required: false })
    toEquipmentId?: number;

    @ApiProperty({ enum: TirePosition, required: false })
    fromPosition?: TirePosition;

    @ApiProperty({ enum: TirePosition, required: false })
    toPosition?: TirePosition;

    @ApiProperty()
    rotationDate: Date;

    @ApiProperty({ required: false })
    kmAtRotation?: number;
}
