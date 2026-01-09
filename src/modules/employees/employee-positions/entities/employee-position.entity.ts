import { ApiProperty } from "@nestjs/swagger";
import { EmployeePosition as PrismaEmployeePosition } from "@prisma/client";
import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class EmployeePosition implements Partial<PrismaEmployeePosition> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field()
    @ApiProperty()
    name: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    description?: string;

    @Field()
    @ApiProperty()
    createdAt: Date;

    @Field()
    @ApiProperty()
    updatedAt: Date;
}
