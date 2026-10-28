import { ApiProperty } from "@nestjs/swagger";
import { Country as PrismaCountry } from "@prisma/client";
import { Province } from "../../provinces/entities/province.entity";

export class Country implements Partial<PrismaCountry> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    provinces?: Province[];
}
