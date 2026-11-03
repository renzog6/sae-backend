import { ApiProperty } from "@nestjs/swagger";
import { Tire as PrismaTire, TireStatus, TirePosition } from "@prisma/client";
import { TireModel } from "../tire-models/entity/tire-model.entity";
import { TireAssignment } from "../entities/tire-assignment.entity";
import { TireInspection } from "../entities/tire-inspection.entity";
import { TireRecap } from "../entities/tire-recap.entity";
import { TireRotation } from "../entities/tire-rotation.entity";
import { TireEvent } from "../entities/tire-event.entity";

export class Tire implements Partial<PrismaTire> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    serialNumber: string;

    @ApiProperty()
    modelId: number;

    model?: TireModel;

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

    // Relations
    assignments?: TireAssignment[];

    inspections?: TireInspection[];

    recaps?: TireRecap[];

    rotations?: TireRotation[];

    events?: TireEvent[];
}
