import { ApiProperty } from "@nestjs/swagger";
import { Province as PrismaProvince } from "@prisma/client";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Country } from "../../countries/entities/country.entity";
import { City } from "../../cities/entities/city.entity";

@ObjectType()
export class Province implements Partial<PrismaProvince> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field()
    @ApiProperty()
    name: string;

    @Field(() => Country, { nullable: true })
    country?: Country;

    @Field(() => [City], { nullable: true })
    cities?: City[];
}
