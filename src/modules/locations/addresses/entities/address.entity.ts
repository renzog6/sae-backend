import { ApiProperty } from "@nestjs/swagger";
import { Address as PrismaAddress } from "@prisma/client";
import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { City } from "../../cities/entities/city.entity";
import { Company } from "../../../companies/entities/company.entity";
import { Person } from "../../../persons/entities/person.entity";

@ObjectType()
export class Address implements Partial<PrismaAddress | any> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field({ nullable: true })
    @ApiProperty()
    street?: string;

    @Field({ nullable: true })
    @ApiProperty()
    number?: string;

    @Field({ nullable: true })
    @ApiProperty()
    floor?: string;

    @Field({ nullable: true })
    @ApiProperty()
    apartment?: string;

    @Field({ nullable: true })
    @ApiProperty()
    neighborhood?: string;

    @Field({ nullable: true })
    @ApiProperty()
    reference?: string;

    @Field(() => Float, { nullable: true })
    @ApiProperty()
    latitude?: number | any;

    @Field(() => Float, { nullable: true })
    @ApiProperty()
    longitude?: number | any;

    @Field()
    @ApiProperty()
    isActive: boolean;

    @Field(() => City, { nullable: true })
    city?: City;

    @Field(() => Company, { nullable: true })
    company?: Company;

    @Field(() => Person, { nullable: true })
    person?: Person;
}
