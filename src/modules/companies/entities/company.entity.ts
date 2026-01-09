import { ApiProperty } from "@nestjs/swagger";
import { Company as PrismaCompany } from "@prisma/client";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { BusinessCategory } from "../business-categories/entities/business-category.entity";

@ObjectType()
export class Company implements Partial<PrismaCompany> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field()
    @ApiProperty()
    cuit: string;

    @Field()
    @ApiProperty()
    name: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    businessName?: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    information?: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    businessCategoryId?: number;

    @Field(() => BusinessCategory, { nullable: true })
    businessCategory?: BusinessCategory;

    @Field()
    @ApiProperty()
    isActive: boolean;

    @Field()
    @ApiProperty()
    createdAt: Date;

    @Field()
    @ApiProperty()
    updatedAt: Date;
}
