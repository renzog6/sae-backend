import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateEmployeeVacationDto {
  @ApiProperty({ example: 'Vacaciones de verano', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  detail?: string;

  @ApiProperty({ example: 10, required: false })
  @IsInt()
  @IsOptional()
  @Min(0)
  days?: number;

  @ApiProperty({ example: 2025, required: false })
  @IsInt()
  @IsOptional()
  year?: number;

  @ApiProperty({ example: 'Observaciones', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  information?: string;

  @ApiProperty({ example: '2025-01-10T00:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  startDate!: string;

  @ApiProperty({ example: '2025-01-20T00:00:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  settlementDate!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  employeeId!: number;
}
