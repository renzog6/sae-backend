// filepath: sae-backend/src/modules/equipment/equipment-transaction/dto/create-equipment-transaction.dto.ts
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  IsPositive,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { EquipmentTransactionType } from "../enums/equipment-transaction-type.enum";

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
  @IsDateString()
  date: string;

  @ApiProperty({ description: "Transaction amount" })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ description: "Currency code (ARS, USD, etc.)" })
  @IsString()
  currency: string;

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
