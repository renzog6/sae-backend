import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { EquipmentType as PrismaEquipmentType } from "@prisma/client";
import { EquipmentCategory } from "../../equipment-categories/entity/equipment-category.entity";

@ObjectType()
export class EquipmentType implements Partial<PrismaEquipmentType> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field()
    @ApiProperty()
    name: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    code: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    description?: string;

    @Field(() => Int)
    @ApiProperty({ required: false })
    categoryId: number;

    @Field(() => EquipmentCategory, { nullable: true })
    category?: EquipmentCategory;
}
