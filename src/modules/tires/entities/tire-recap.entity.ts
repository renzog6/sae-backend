import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TireRecap as PrismaTireRecap } from "@prisma/client";
import { Tire } from "../entity/tire.entity";

@ObjectType()
export class TireRecap implements Partial<PrismaTireRecap> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field(() => Int)
    @ApiProperty()
    tireId: number;

    @Field(() => Tire, { nullable: true })
    tire?: Tire;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    provider?: string;

    @Field()
    @ApiProperty()
    recapDate: Date;

    @Field(() => Float, { nullable: true })
    @ApiProperty({ required: false })
    cost?: any;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    notes?: string;

    @Field(() => Int)
    @ApiProperty()
    recapNumber: number;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    kmAtRecap?: number;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    recapType?: string;
}
