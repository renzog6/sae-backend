import { ApiProperty } from "@nestjs/swagger";
import { City as PrismaCity } from "@prisma/client";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Province } from "../../provinces/entities/province.entity";
import { Address } from "../../addresses/entities/address.entity";

@ObjectType()
export class City implements Partial<PrismaCity> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field()
    @ApiProperty()
    name: string;

    @Field()
    @ApiProperty()
    postalCode: string;

    @Field(() => Province, { nullable: true })
    province?: Province;

    @Field(() => [Address], { nullable: true })
    addresses?: Address[];
}
