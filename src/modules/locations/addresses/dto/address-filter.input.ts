import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class AddressFilterInput {
    @Field(() => Int, { nullable: true })
    companyId?: number;

    @Field(() => Int, { nullable: true })
    personId?: number;

    @Field(() => Int, { nullable: true })
    cityId?: number;
}
