import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { EquipmentCategory as PrismaEquipmentCategory } from "@prisma/client";

@ObjectType()
export class EquipmentCategory implements Partial<PrismaEquipmentCategory> {
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
}
