import { InputType, Field, Int } from "@nestjs/graphql";
import { ContactType } from "@prisma/client";
import { IsEnum, IsString, IsOptional, IsInt, IsEmail, Matches, ValidateIf } from "class-validator";

@InputType()
export class CreateContactInput {
    @Field(() => ContactType)
    @IsEnum(ContactType)
    type: ContactType;

    @Field()
    @IsString()
    @ValidateIf(o => o.type === ContactType.EMAIL)
    @IsEmail()
    @ValidateIf(o => o.type === ContactType.PHONE || o.type === ContactType.WHATSAPP)
    @Matches(/^\+\d{7,15}$/)
    value: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    label?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    information?: string;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    companyId?: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    personId?: number;
}

@InputType()
export class UpdateContactInput {
    @Field(() => ContactType, { nullable: true })
    @IsOptional()
    @IsEnum(ContactType)
    type?: ContactType;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    value?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    label?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    information?: string;
}
