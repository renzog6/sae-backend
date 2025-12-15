import { ApiProperty } from "@nestjs/swagger";
import { EmployeeCategory as PrismaEmployeeCategory } from "@prisma/client";

export class EmployeeCategory implements Partial<PrismaEmployeeCategory> {
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
