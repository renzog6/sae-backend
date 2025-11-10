// filepath: sae-backend/src/modules/history/dto/create-history-log.dto.ts
import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  IsNumber,
  IsObject,
} from "class-validator";
import { HistoryType, SeverityLevel } from "@prisma/client";

export class CreateHistoryLogDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(HistoryType)
  type: HistoryType;

  @IsOptional()
  @IsEnum(SeverityLevel)
  severity?: SeverityLevel;

  @IsOptional()
  @IsDate()
  eventDate?: Date;

  @IsOptional()
  @IsNumber()
  employeeId?: number;

  @IsOptional()
  @IsNumber()
  companyId?: number;

  @IsOptional()
  @IsNumber()
  equipmentId?: number;

  @IsOptional()
  @IsNumber()
  personId?: number;

  @IsOptional()
  @IsString()
  metadata?: string;
}
