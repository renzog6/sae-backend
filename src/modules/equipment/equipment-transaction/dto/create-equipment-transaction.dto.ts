import { InputType, Field, Int, Float } from "@nestjs/graphql";
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  IsPositive,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { EquipmentTransactionType, Currency } from "@prisma/client";
import { Type } from "class-transformer";

@InputType()
export class CreateEquipmentTransactionDto {
  @Field(() => Int)
  @ApiProperty({ description: "Equipment ID" })
  @IsInt()
  @IsPositive()
  equipmentId: number;

  @Field(() => Int)
  @ApiProperty({ description: "Company ID" })
  @IsInt()
  @IsPositive()
  companyId: number;

  @Field(() => EquipmentTransactionType)
  @ApiProperty({
    description: "Transaction type",
    enum: EquipmentTransactionType,
  })
  @IsEnum(EquipmentTransactionType)
  type: EquipmentTransactionType;

  @Field(() => Date)
  @ApiProperty({ description: "Transaction date" })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @Field(() => Float)
  @ApiProperty({ description: "Transaction amount" })
  @IsNumber()
  @Min(0)
  amount: number;

  @Field(() => Currency)
  @ApiProperty({ description: "Currency code (ARS, USD, etc.)" })
  @IsEnum(Currency)
  currency: Currency;

  @Field(() => Float, { nullable: true })
  @ApiPropertyOptional({ description: "Exchange rate" })
  @IsOptional()
  @IsNumber()
  @Min(0)
  exchangeRate?: number;

  @Field({ nullable: true })
  @ApiPropertyOptional({ description: "Transaction observation" })
  @IsOptional()
  @IsString()
  observation?: string;
}
