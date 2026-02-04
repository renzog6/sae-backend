import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { EquipmentModel as PrismaEquipmentModel } from "@prisma/client";
import { EquipmentType } from "../../equipment-types/entity/equipment-type.entity";
import { Brand } from "@modules/catalogs/brands/entities/brand.entity";

@ObjectType()
export class EquipmentModel implements Partial<PrismaEquipmentModel> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field()
    @ApiProperty()
    name: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    code?: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    description?: string;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    year?: number;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    typeId?: number;

    @Field(() => EquipmentType, { nullable: true })
    type?: EquipmentType;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    brandId?: number;

    @Field(() => Brand, { nullable: true })
    brand?: Brand;

    @Field()
    @ApiProperty()
    isActive: boolean;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    deletedAt?: Date;
}
