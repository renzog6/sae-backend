import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Gender, MaritalStatus, PersonStatus } from '@prisma/client';

export class CreatePersonDto {
  @ApiProperty({ example: 'Juan' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName!: string;

  @ApiProperty({ example: 'Pérez' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName!: string;

  @ApiProperty({ example: '1990-05-20T00:00:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @ApiProperty({ example: '12345678', required: false, description: 'DNI, único' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  dni?: string;

  @ApiProperty({ example: '20-12345678-3', required: false, description: 'CUIL, único' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  cuil?: string;

  @ApiProperty({ enum: Gender, required: false })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiProperty({ enum: MaritalStatus, required: false })
  @IsEnum(MaritalStatus)
  @IsOptional()
  maritalStatus?: MaritalStatus;

  @ApiProperty({ example: 'Notas', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  information?: string;

  @ApiProperty({ enum: PersonStatus, required: false, default: PersonStatus.ACTIVE })
  @IsEnum(PersonStatus)
  @IsOptional()
  status?: PersonStatus;
}
