import { ApiProperty } from "@nestjs/swagger";
import { TirePositionConfig as PrismaTirePositionConfig, TireSide } from "@prisma/client";
import { EquipmentAxle } from "../../equipment/equipment-axles/entity/equipment-axle.entity";
import { TireAssignment } from "./tire-assignment.entity";

export class TirePositionConfig implements Partial<PrismaTirePositionConfig> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    axleId: number;

    axle?: EquipmentAxle;

    @ApiProperty()
    positionKey: string;

    @ApiProperty({ enum: TireSide })
    side: TireSide;

    @ApiProperty()
    isDual: boolean;

    assignments?: TireAssignment[];
}
