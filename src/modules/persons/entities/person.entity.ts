import { ApiProperty } from "@nestjs/swagger";
import { Person as PrismaPerson, Gender, MaritalStatus, PersonStatus } from "@prisma/client";
import { ObjectType, Field, registerEnumType, Int } from "@nestjs/graphql";

registerEnumType(Gender, { name: 'Gender' });
registerEnumType(MaritalStatus, { name: 'MaritalStatus' });
registerEnumType(PersonStatus, { name: 'PersonStatus' });

@ObjectType()
export class Person implements Partial<PrismaPerson> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field()
    @ApiProperty()
    firstName: string;

    @Field()
    @ApiProperty()
    lastName: string;

    @Field()
    @ApiProperty()
    dni: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    cuil?: string;

    @Field(() => Date, { nullable: true })
    @ApiProperty({ required: false })
    birthDate?: Date;

    @Field(() => Gender, { nullable: true })
    @ApiProperty({ enum: Gender, required: false })
    gender?: Gender;

    @Field(() => MaritalStatus, { nullable: true })
    @ApiProperty({ enum: MaritalStatus, required: false })
    maritalStatus?: MaritalStatus;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    information?: string;

    @Field(() => PersonStatus)
    @ApiProperty({ enum: PersonStatus })
    status: PersonStatus;

    // Relations typically handled via separate Resolver or FieldResolver, 
    // but if we want to expose them directly if loaded:
    // @Field(() => Employee, { nullable: true })
    // employee?: Employee; 
}
