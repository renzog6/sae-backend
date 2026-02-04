import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TireAssignment as PrismaTireAssignment } from "@prisma/client";
import { Tire } from "../entity/tire.entity";
import { TirePositionConfig } from "./tire-position-config.entity";

@ObjectType()
export class TireAssignment implements Partial<PrismaTireAssignment> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field(() => Int)
    @ApiProperty()
    tireId: number;

    @Field(() => Tire, { nullable: true })
    tire?: Tire;

    @Field(() => Int)
    @ApiProperty()
    positionConfigId: number;

    @Field(() => TirePositionConfig, { nullable: true })
    positionConfig?: TirePositionConfig;

    @Field()
    @ApiProperty()
    startDate: Date;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    endDate?: Date;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    kmAtStart?: number;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    kmAtEnd?: number;
}
