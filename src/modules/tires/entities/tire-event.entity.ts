import { ApiProperty } from "@nestjs/swagger";
import { TireEvent as PrismaTireEvent, TireEventType } from "@prisma/client";
import { Tire } from "../entity/tire.entity";

export class TireEvent implements Partial<PrismaTireEvent> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    tireId: number;

    tire?: Tire;

    @ApiProperty({ enum: TireEventType })
    eventType: TireEventType;

    @ApiProperty()
    eventDate: Date;

    @ApiProperty({ required: false })
    userId?: number;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false })
    metadata?: string;
}
