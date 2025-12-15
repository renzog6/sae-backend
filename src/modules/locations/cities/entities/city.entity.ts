import { ApiProperty } from "@nestjs/swagger";
import { City as PrismaCity } from "@prisma/client";

export class City implements Partial<PrismaCity> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}
