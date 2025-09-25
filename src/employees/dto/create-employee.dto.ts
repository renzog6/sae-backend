// file: sae-backend/src/employees/dto/create-employee.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { EmployeeStatus } from '@prisma/client';

export class CreateEmployeeDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  information?: string;

  @ApiProperty({ enum: EmployeeStatus, default: EmployeeStatus.ACTIVE })
  @IsEnum(EmployeeStatus)
  @IsOptional()
  status?: EmployeeStatus;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  hireDate!: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  companyId?: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  categoryId!: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  positionId!: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  personId!: number;
}
