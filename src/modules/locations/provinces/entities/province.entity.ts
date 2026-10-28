import { ApiProperty } from "@nestjs/swagger";
import { Province as PrismaProvince } from "@prisma/client";
import { Country } from "../../countries/entities/country.entity";
import { City } from "../../cities/entities/city.entity";

export class Province implements Partial<PrismaProvince> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    country?: Country;

    cities?: City[];
}
