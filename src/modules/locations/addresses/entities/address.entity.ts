import { ApiProperty } from "@nestjs/swagger";
import { Address as PrismaAddress } from "@prisma/client";
import { City } from "../../cities/entities/city.entity";
import { Company } from "../../../companies/entities/company.entity";
import { Person } from "../../../persons/entities/person.entity";

export class Address implements Partial<PrismaAddress | any> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    street?: string;

    @ApiProperty()
    number?: string;

    @ApiProperty()
    floor?: string;

    @ApiProperty()
    apartment?: string;

    @ApiProperty()
    neighborhood?: string;

    @ApiProperty()
    reference?: string;

    @ApiProperty()
    latitude?: number | any;

    @ApiProperty()
    longitude?: number | any;

    @ApiProperty()
    isActive: boolean;

    city?: City;

    company?: Company;

    person?: Person;
}
