import { ApiProperty } from "@nestjs/swagger";
import { TireRecap as PrismaTireRecap } from "@prisma/client";
import { Tire } from "../entity/tire.entity";

export class TireRecap implements Partial<PrismaTireRecap> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    tireId: number;

    tire?: Tire;

    @ApiProperty({ required: false })
    provider?: string;

    @ApiProperty()
    recapDate: Date;

    @ApiProperty({ required: false })
    cost?: any;

    @ApiProperty({ required: false })
    notes?: string;

    @ApiProperty()
    recapNumber: number;

    @ApiProperty({ required: false })
    kmAtRecap?: number;

    @ApiProperty({ required: false })
    recapType?: string;
}
