import { ApiProperty } from "@nestjs/swagger";
import { EquipmentModel as PrismaEquipmentModel } from "@prisma/client";

export class EquipmentModel implements Partial<PrismaEquipmentModel> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    code?: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false })
    year?: number;

    @ApiProperty({ required: false })
    typeId?: number;

    @ApiProperty({ required: false })
    brandId?: number;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty({ required: false })
    deletedAt?: Date;
}
