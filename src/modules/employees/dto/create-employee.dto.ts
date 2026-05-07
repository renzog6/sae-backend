// filepath: sae-backend/src/modules/employees/dto/create-employee.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { Field, InputType, Int } from "@nestjs/graphql";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { EmployeeStatus } from "@prisma/client";

@InputType()
export class CreateEmployeeDto {
  @ApiProperty({
    required: false,
    description: "Número de legajo interno de la empresa",
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  @Field(() => String, { nullable: true })
  employeeCode?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  @Field(() => String, { nullable: true })
  information?: string;

  @ApiProperty({ enum: EmployeeStatus, default: EmployeeStatus.ACTIVE })
  @IsEnum(EmployeeStatus)
  @IsOptional()
  @Field(() => EmployeeStatus, { nullable: true })
  status?: EmployeeStatus;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  @Field(() => String)
  hireDate!: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  endDate?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  companyId?: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  categoryId!: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  positionId!: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  personId!: number;
}
