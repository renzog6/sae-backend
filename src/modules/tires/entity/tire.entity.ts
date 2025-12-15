import { ApiProperty } from "@nestjs/swagger";
import { Tire as PrismaTire, TireStatus, TirePosition } from "@prisma/client";

export class Tire implements Partial<PrismaTire> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    serialNumber: string;

    @ApiProperty()
    modelId: number;

    @ApiProperty({ required: false, enum: TirePosition })
    position?: TirePosition;

    @ApiProperty({ enum: TireStatus })
    status: TireStatus;

    @ApiProperty({ required: false })
    totalKm?: number;

    @ApiProperty({ required: false })
    recapCount?: number;

    @ApiProperty({ required: false })
    lastRecapAt?: Date;

    @ApiProperty({ required: false })
    lastRecapId?: number;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty({ required: false })
    deletedAt?: Date;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
