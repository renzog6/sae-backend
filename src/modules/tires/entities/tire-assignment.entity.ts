import { ApiProperty } from "@nestjs/swagger";
import { TireAssignment as PrismaTireAssignment } from "@prisma/client";
import { Tire } from "../entity/tire.entity";
import { TirePositionConfig } from "./tire-position-config.entity";

export class TireAssignment implements Partial<PrismaTireAssignment> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    tireId: number;

    tire?: Tire;

    @ApiProperty()
    positionConfigId: number;

    positionConfig?: TirePositionConfig;

    @ApiProperty()
    startDate: Date;

    @ApiProperty({ required: false })
    endDate?: Date;

    @ApiProperty({ required: false })
    kmAtStart?: number;

    @ApiProperty({ required: false })
    kmAtEnd?: number;
}
