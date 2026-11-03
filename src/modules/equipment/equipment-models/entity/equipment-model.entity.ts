import { ApiProperty } from "@nestjs/swagger";
import { EquipmentModel as PrismaEquipmentModel } from "@prisma/client";
import { EquipmentType } from "../../equipment-types/entity/equipment-type.entity";
import { Brand } from "@modules/catalogs/brands/entities/brand.entity";

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

    type?: EquipmentType;

    @ApiProperty({ required: false })
    brandId?: number;

    brand?: Brand;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty({ required: false })
    deletedAt?: Date;
}
