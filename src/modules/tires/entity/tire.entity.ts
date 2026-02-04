import { ObjectType, Field, Int, registerEnumType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Tire as PrismaTire, TireStatus, TirePosition } from "@prisma/client";
import { TireModel } from "../tire-models/entity/tire-model.entity";

registerEnumType(TireStatus, { name: "TireStatus" });
registerEnumType(TirePosition, { name: "TirePosition" });

@ObjectType()
export class Tire implements Partial<PrismaTire> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field()
    @ApiProperty()
    serialNumber: string;

    @Field(() => Int)
    @ApiProperty()
    modelId: number;

    @Field(() => TireModel, { nullable: true })
    model?: TireModel;

    @Field(() => TirePosition, { nullable: true })
    @ApiProperty({ required: false, enum: TirePosition })
    position?: TirePosition;

    @Field(() => TireStatus)
    @ApiProperty({ enum: TireStatus })
    status: TireStatus;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    totalKm?: number;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    recapCount?: number;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    lastRecapAt?: Date;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    lastRecapId?: number;

    @Field()
    @ApiProperty()
    isActive: boolean;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    deletedAt?: Date;

    @Field()
    @ApiProperty()
    createdAt: Date;

    @Field()
    @ApiProperty()
    updatedAt: Date;
}
