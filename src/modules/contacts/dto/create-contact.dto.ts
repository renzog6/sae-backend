// filepath: sae-backend/src/modules/contacts/dto/create-contact.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateIf,
  IsEmail,
  Matches,
} from "class-validator";
import { ContactType } from "@prisma/client";
import { Type } from "class-transformer";

export class CreateContactDto {
  @ApiProperty({
    enum: ContactType,
    description: "Type of contact method",
  })
  @IsEnum(ContactType)
  type: ContactType;

  @ApiProperty({
    description: "Value of the contact (email, phone number, handle, etc.)",
    examples: {
      email: { value: "contact@example.com", description: "Email address" },
      phone: {
        value: "+5491123456789",
        description: "Phone number in E.164 format",
      },
      whatsapp: {
        value: "+5491123456789",
        description: "WhatsApp number in E.164 format",
      },
    },
  })
  @IsString()
  @ValidateIf((o) => o.type === ContactType.EMAIL)
  @IsEmail()
  @ValidateIf(
    (o) => o.type === ContactType.PHONE || o.type === ContactType.WHATSAPP
  )
  @Matches(/^\+\d{7,15}$/) // E.164 format
  value: string;

  @ApiProperty({
    description: "Optional label for the contact",
    example: "Work Phone",
    required: false,
  })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({
    description: "Additional information about the contact",
    example: "Best time to call: 9AM-5PM",
    required: false,
  })
  @IsOptional()
  @IsString()
  information?: string;

  // Nota: Se aplican validaciones condicionales directamente sobre `value` para evitar duplicidad

  @ApiProperty({
    description: "Associated company id",
    example: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  companyId?: number;

  @ApiProperty({
    description: "Associated person id",
    example: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  personId?: number;
}
