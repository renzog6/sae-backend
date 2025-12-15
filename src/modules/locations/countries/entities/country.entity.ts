import { ApiProperty } from "@nestjs/swagger";
import { Country as PrismaCountry } from "@prisma/client";

export class Country implements Partial<PrismaCountry> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}
