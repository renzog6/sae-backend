import { ApiProperty } from "@nestjs/swagger";
import { BusinessSubCategory as PrismaBusinessSubCategory } from "@prisma/client";
import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class BusinessSubCategory implements Partial<PrismaBusinessSubCategory> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field()
    @ApiProperty()
    name: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    description?: string;

    @Field(() => Int)
    @ApiProperty()
    businessCategoryId: number;

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
