import { ApiProperty } from "@nestjs/swagger";
import { EmployeePosition as PrismaEmployeePosition } from "@prisma/client";

export class EmployeePosition implements Partial<PrismaEmployeePosition> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
