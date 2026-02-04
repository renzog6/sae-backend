import { ObjectType, Field, Int, registerEnumType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Tire as PrismaTire, TireStatus, TirePosition } from "@prisma/client";
import { TireModel } from "../tire-models/entity/tire-model.entity";
import { TireAssignment } from "../entities/tire-assignment.entity";
import { TireInspection } from "../entities/tire-inspection.entity";
import { TireRecap } from "../entities/tire-recap.entity";
import { TireRotation } from "../entities/tire-rotation.entity";
import { TireEvent } from "../entities/tire-event.entity";

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

    // Relations
    @Field(() => [TireAssignment], { nullable: true })
    assignments?: TireAssignment[];

    @Field(() => [TireInspection], { nullable: true })
    inspections?: TireInspection[];

    @Field(() => [TireRecap], { nullable: true })
    recaps?: TireRecap[];

    @Field(() => [TireRotation], { nullable: true })
    rotations?: TireRotation[];

    @Field(() => [TireEvent], { nullable: true })
    events?: TireEvent[];
}
