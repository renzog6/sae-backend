import { ApiProperty } from "@nestjs/swagger";
import { Family as PrismaFamily } from "@prisma/client";

export class Family implements Partial<PrismaFamily> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    relationship: string;

    @ApiProperty()
    personId: number;

    @ApiProperty()
    relativeId: number;
}
