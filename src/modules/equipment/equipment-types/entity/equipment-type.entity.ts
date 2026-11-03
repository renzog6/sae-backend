import { ApiProperty } from "@nestjs/swagger";
import { EquipmentType as PrismaEquipmentType } from "@prisma/client";
import { EquipmentCategory } from "../../equipment-categories/entity/equipment-category.entity";

export class EquipmentType implements Partial<PrismaEquipmentType> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    code: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false })
    categoryId: number;

    category?: EquipmentCategory;
}
