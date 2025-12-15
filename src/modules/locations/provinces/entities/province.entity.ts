import { ApiProperty } from "@nestjs/swagger";
import { Province as PrismaProvince } from "@prisma/client";

export class Province implements Partial<PrismaProvince> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}
