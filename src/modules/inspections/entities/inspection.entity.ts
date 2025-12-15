import { ApiProperty } from "@nestjs/swagger";
import { Inspection as PrismaInspection } from "@prisma/client";

export class Inspection implements Partial<PrismaInspection> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    date: Date;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false })
    observation?: string;

    @ApiProperty()
    equipmentId: number;

    @ApiProperty()
    employeeId: number;

    @ApiProperty()
    inspectionTypeId: number;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
