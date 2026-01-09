import { ApiProperty } from "@nestjs/swagger";
import { BusinessCategory as PrismaBusinessCategory } from "@prisma/client";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { BusinessSubCategory } from "../../business-subcategories/entities/business-subcategory.entity";

@ObjectType()
export class BusinessCategory implements Partial<PrismaBusinessCategory> {
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
    information?: string;

    @Field()
    @ApiProperty()
    isActive: boolean;

    @Field()
    @ApiProperty()
    createdAt: Date;

    @Field()
    @ApiProperty()
    updatedAt: Date;

    @Field(() => [BusinessSubCategory], { nullable: true })
    subCategories?: BusinessSubCategory[];
}
