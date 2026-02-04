import { ObjectType, Field, Int, registerEnumType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TireEvent as PrismaTireEvent, TireEventType } from "@prisma/client";
import { Tire } from "../entity/tire.entity";

registerEnumType(TireEventType, {
    name: "TireEventType",
});

@ObjectType()
export class TireEvent implements Partial<PrismaTireEvent> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field(() => Int)
    @ApiProperty()
    tireId: number;

    @Field(() => Tire, { nullable: true })
    tire?: Tire;

    @Field(() => TireEventType)
    @ApiProperty({ enum: TireEventType })
    eventType: TireEventType;

    @Field()
    @ApiProperty()
    eventDate: Date;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    userId?: number;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    description?: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    metadata?: string;
}
