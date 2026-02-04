import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TireSize as PrismaTireSize } from "@prisma/client";

@ObjectType()
export class TireSize implements Partial<PrismaTireSize> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field()
    @ApiProperty()
    mainCode: string;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    width?: number;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    aspectRatio?: number;

    @Field(() => Float, { nullable: true })
    @ApiProperty({ required: false })
    rimDiameter?: any; // Decimal in Prisma

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    information?: string;
}
