import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TireModel as PrismaTireModel } from "@prisma/client";
import { Brand } from "@modules/catalogs/brands/entities/brand.entity";
import { TireSize } from "../../tire-sizes/entity/tire-size.entity";

@ObjectType()
export class TireModel implements Partial<PrismaTireModel> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field(() => Int)
    @ApiProperty()
    brandId: number;

    @Field(() => Brand, { nullable: true })
    brand?: Brand;

    @Field(() => Int)
    @ApiProperty()
    sizeId: number;

    @Field(() => TireSize, { nullable: true })
    size?: TireSize;

    @Field()
    @ApiProperty()
    name: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    construction?: string;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    loadIndex?: number;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    speedSymbol?: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    plyRating?: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    treadPattern?: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    information?: string;
}
