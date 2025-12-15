import { ApiProperty } from "@nestjs/swagger";
import { InspectionType as PrismaInspectionType } from "@prisma/client";

export class InspectionType implements Partial<PrismaInspectionType> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    description?: string;
}
