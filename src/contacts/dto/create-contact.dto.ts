import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, ValidateIf, IsEmail, Matches } from 'class-validator';
import { ContactType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateContactDto {
  @ApiProperty({ enum: ContactType })
  @IsEnum(ContactType)
  type: ContactType;

  @ApiProperty({ description: 'Value of the contact (email, phone number, handle, etc.)' })
  @IsString()
  @ValidateIf((o) => o.type === ContactType.EMAIL)
  @IsEmail()
  @ValidateIf((o) => o.type === ContactType.PHONE || o.type === ContactType.WHATSAPP)
  @Matches(/^\+\d{7,15}$/) // E.164 format
  value: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  label?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  information?: string;

  // Nota: Se aplican validaciones condicionales directamente sobre `value` para evitar duplicidad

  @ApiProperty({ description: 'Associated company id', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  companyId?: number;

  @ApiProperty({ description: 'Associated person id', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  personId?: number;
}