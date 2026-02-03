import { ApiProperty } from "@nestjs/swagger";
import { Country as PrismaCountry } from "@prisma/client";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Province } from "../../provinces/entities/province.entity";

@ObjectType()
export class Country implements Partial<PrismaCountry> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field()
    @ApiProperty()
    name: string;

    @Field(() => [Province], { nullable: true })
    provinces?: Province[];
}
