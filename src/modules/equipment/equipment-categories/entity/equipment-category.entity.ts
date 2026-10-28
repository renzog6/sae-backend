import { ApiProperty } from "@nestjs/swagger";
import { EquipmentCategory as PrismaEquipmentCategory } from "@prisma/client";

export class EquipmentCategory implements Partial<PrismaEquipmentCategory> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    code: string;

    @ApiProperty({ required: false })
    description?: string;
}
