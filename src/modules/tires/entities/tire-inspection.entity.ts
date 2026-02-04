import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TireInspection as PrismaTireInspection } from "@prisma/client";
import { Tire } from "../entity/tire.entity";

@ObjectType()
export class TireInspection implements Partial<PrismaTireInspection> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field(() => Int)
    @ApiProperty()
    tireId: number;

    @Field(() => Tire, { nullable: true })
    tire?: Tire;

    @Field()
    @ApiProperty()
    inspectionDate: Date;

    @Field(() => Float, { nullable: true })
    @ApiProperty({ required: false })
    pressure?: any;

    @Field(() => Float, { nullable: true })
    @ApiProperty({ required: false })
    treadDepth?: any;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    observation?: string;
}
