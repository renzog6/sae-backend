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

export class CreateEquipmentTransactionDto {
  @ApiProperty({ description: "Equipment ID" })
  @IsInt()
  @IsPositive()
  equipmentId: number;

  @ApiProperty({ description: "Company ID" })
  @IsInt()
  @IsPositive()
  companyId: number;

  @ApiProperty({
    description: "Transaction type",
    enum: EquipmentTransactionType,
  })
  @IsEnum(EquipmentTransactionType)
  type: EquipmentTransactionType;

  @ApiProperty({ description: "Transaction date" })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({ description: "Transaction amount" })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ description: "Currency code (ARS, USD, etc.)" })
  @IsEnum(Currency)
  currency: Currency;

  @ApiPropertyOptional({ description: "Exchange rate" })
  @IsOptional()
  @IsNumber()
  @Min(0)
  exchangeRate?: number;

  @ApiPropertyOptional({ description: "Transaction observation" })
  @IsOptional()
  @IsString()
  observation?: string;
}
