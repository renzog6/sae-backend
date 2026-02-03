// contacts/dto/contact-filter.input.ts
import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class ContactFilterInput {
    @Field(() => Int, { nullable: true })
    companyId?: number;

    @Field(() => Int, { nullable: true })
    personId?: number;
}
