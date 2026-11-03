import { ApiProperty } from "@nestjs/swagger";
import { TireInspection as PrismaTireInspection } from "@prisma/client";
import { Tire } from "../entity/tire.entity";

export class TireInspection implements Partial<PrismaTireInspection> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    tireId: number;

    tire?: Tire;

    @ApiProperty()
    inspectionDate: Date;

    @ApiProperty({ required: false })
    pressure?: any;

    @ApiProperty({ required: false })
    treadDepth?: any;

    @ApiProperty({ required: false })
    observation?: string;
}
