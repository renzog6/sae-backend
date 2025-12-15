import { ApiProperty } from "@nestjs/swagger";
import { Equipment as PrismaEquipment, EquipmentStatus } from "@prisma/client";

export class Equipment implements Partial<PrismaEquipment> {
    @ApiProperty()
    id: number;

    @ApiProperty({ required: false })
    internalCode?: string;

    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false })
    observation?: string;

    @ApiProperty({ required: false })
    year?: number;

    @ApiProperty({ required: false })
    licensePlate?: string;

    @ApiProperty({ required: false })
    chassis?: string;

    @ApiProperty({ required: false })
    engine?: string;

    @ApiProperty({ required: false })
    color?: string;

    @ApiProperty({ required: false })
    diesel?: boolean;

    @ApiProperty({ enum: EquipmentStatus })
    status: EquipmentStatus;

    @ApiProperty({ required: false })
    companyId?: number;

    @ApiProperty({ required: false })
    categoryId?: number;

    @ApiProperty({ required: false })
    typeId?: number;

    @ApiProperty({ required: false })
    modelId?: number;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty({ required: false })
    deletedAt?: Date;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
