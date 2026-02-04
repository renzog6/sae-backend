import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Brand {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    code: string;

    @Field({ nullable: true })
    information?: string;

    @Field()
    isActive: boolean;

    @Field({ nullable: true })
    deletedAt?: Date;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
