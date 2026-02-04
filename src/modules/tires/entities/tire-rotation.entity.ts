import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TireRotation as PrismaTireRotation, TirePosition } from "@prisma/client";
import { Tire } from "../entity/tire.entity";

@ObjectType()
export class TireRotation implements Partial<PrismaTireRotation> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field(() => Int)
    @ApiProperty()
    tireId: number;

    @Field(() => Tire, { nullable: true })
    tire?: Tire;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    fromEquipmentId?: number;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    toEquipmentId?: number;

    @Field(() => TirePosition, { nullable: true })
    @ApiProperty({ enum: TirePosition, required: false })
    fromPosition?: TirePosition;

    @Field(() => TirePosition, { nullable: true })
    @ApiProperty({ enum: TirePosition, required: false })
    toPosition?: TirePosition;

    @Field()
    @ApiProperty()
    rotationDate: Date;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    kmAtRotation?: number;
}
