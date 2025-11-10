// filepath: sae-backend/src/modules/history/dto/create-equipment-maintenance.dto.ts
import {
  IsEnum,
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
  IsBoolean,
} from "class-validator";
import { MaintenanceType } from "@prisma/client";

export class CreateEquipmentMaintenanceDto {
  @IsEnum(MaintenanceType)
  type: MaintenanceType;

  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  technician?: string;

  @IsOptional()
  @IsBoolean()
  warranty?: boolean;

  @IsNumber()
  equipmentId: number;
}
