import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class FilterInput {
    @Field({ nullable: true })
    q?: string;

    @Field({ nullable: true })
    where?: string;

    @Field({ nullable: true })
    orderBy?: string;
}
