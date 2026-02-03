import { ApiProperty } from "@nestjs/swagger";
import { Contact as PrismaContact, ContactType } from "@prisma/client";
import { ObjectType, Field, Int, registerEnumType } from "@nestjs/graphql";

registerEnumType(ContactType, { name: 'ContactType' });

@ObjectType()
export class Contact implements Partial<PrismaContact> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field(() => ContactType)
    @ApiProperty({ enum: ContactType })
    type: ContactType;

    @Field()
    @ApiProperty()
    value: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    label?: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    information?: string;
}
