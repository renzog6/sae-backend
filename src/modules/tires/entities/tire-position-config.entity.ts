import { ObjectType, Field, Int, registerEnumType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TirePositionConfig as PrismaTirePositionConfig, TireSide } from "@prisma/client";
import { EquipmentAxle } from "../../equipment/equipment-axles/entity/equipment-axle.entity";
import { TireAssignment } from "./tire-assignment.entity";

registerEnumType(TireSide, {
    name: "TireSide",
});

@ObjectType()
export class TirePositionConfig implements Partial<PrismaTirePositionConfig> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field(() => Int)
    @ApiProperty()
    axleId: number;

    @Field(() => EquipmentAxle, { nullable: true })
    axle?: EquipmentAxle;

    @Field()
    @ApiProperty()
    positionKey: string;

    @Field(() => TireSide)
    @ApiProperty({ enum: TireSide })
    side: TireSide;

    @Field()
    @ApiProperty()
    isDual: boolean;

    @Field(() => [TireAssignment], { nullable: true })
    assignments?: TireAssignment[];
}
