import { ContactType } from "@prisma/client";
import { IsEnum, IsString, IsOptional, IsInt, IsEmail, Matches, ValidateIf } from "class-validator";

export class CreateContactInput {
    @IsEnum(ContactType)
    type: ContactType;

    @IsString()
    @ValidateIf(o => o.type === ContactType.EMAIL)
    @IsEmail()
    @ValidateIf(o => o.type === ContactType.PHONE || o.type === ContactType.WHATSAPP)
    @Matches(/^\+\d{7,15}$/)
    value: string;

    @IsOptional()
    @IsString()
    label?: string;

    @IsOptional()
    @IsString()
    information?: string;

    @IsOptional()
    @IsInt()
    companyId?: number;

    @IsOptional()
    @IsInt()
    personId?: number;
}

export class UpdateContactInput {
    @IsOptional()
    @IsEnum(ContactType)
    type?: ContactType;

    @IsOptional()
    @IsString()
    value?: string;

    @IsOptional()
    @IsString()
    label?: string;

    @IsOptional()
    @IsString()
    information?: string;
}
