import { InputType, Field, Int } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  IsEnum,
  IsDate,
  IsNumber,
} from "class-validator";
import { HistoryType, SeverityLevel } from "@prisma/client";
import { Type } from "class-transformer";

@InputType()
export class CreateHistoryLogDto {
  @Field()
  @ApiProperty({
    description: "Title of the history log entry",
    example: "Employee Promotion",
  })
  @IsString()
  title: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    description: "Detailed description of the history log entry",
    example: "Employee was promoted to senior position",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => HistoryType)
  @ApiProperty({
    enum: HistoryType,
    description: "Type of history log entry",
    example: "EMPLOYEE_EVENT",
  })
  @IsEnum(HistoryType)
  type: HistoryType;

  @Field(() => SeverityLevel, { nullable: true })
  @ApiPropertyOptional({
    enum: SeverityLevel,
    description: "Severity level of the log entry",
    example: "INFO",
  })
  @IsOptional()
  @IsEnum(SeverityLevel)
  severity?: SeverityLevel;

  @Field(() => Date, { nullable: true })
  @ApiPropertyOptional({
    description: "Date when the event occurred in ISO format",
    example: "2025-10-01T00:00:00.000Z",
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  eventDate?: Date;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({
    description: "ID of the associated employee",
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  employeeId?: number;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({
    description: "ID of the associated company",
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  companyId?: number;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({
    description: "ID of the associated equipment",
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  equipmentId?: number;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({
    description: "ID of the associated person",
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  personId?: number;

  @Field({ nullable: true })
  @ApiPropertyOptional({
    description: "Additional metadata as JSON string",
    example: '{"key": "value"}',
  })
  @IsOptional()
  @IsString()
  metadata?: string;
}
