import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Unit {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    abbreviation: string;

    @Field()
    isActive: boolean;

    @Field({ nullable: true })
    deletedAt?: Date;
}
