import { InputType, Field, Int } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, IsString, Min, IsDate } from "class-validator";
import { VacationType } from "@prisma/client";
import { Type } from "class-transformer";

@InputType()
export class CreateEmployeeVacationDto {
  @Field({ nullable: true })
  @ApiPropertyOptional({
    description: "Detalle adicional sobre la vacación",
  })
  @IsOptional()
  @IsString()
  detail?: string;

  @Field(() => Int)
  @ApiProperty({ description: "Cantidad de días de la vacación", example: 14 })
  @IsInt()
  @Min(1)
  days: number;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({
    description:
      "Año al que corresponde la vacación (si no se envía se calcula desde startDate)",
    example: 2025,
  })
  @IsOptional()
  @IsInt()
  year?: number;

  @Field(() => Date)
  @ApiProperty({
    description: "Fecha de inicio de la vacación en formato ISO",
    example: "2025-10-01T00:00:00.000Z",
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @Field(() => VacationType, { nullable: true })
  @ApiPropertyOptional({
    description:
      "Tipo de vacación (ASSIGNED = días acreditados, TAKEN = días tomados)",
    enum: VacationType,
    example: VacationType.TAKEN,
  })
  @IsOptional()
  @IsEnum(VacationType)
  type?: VacationType;

  @Field(() => Date, { nullable: true })
  @ApiPropertyOptional({
    description:
      "Fecha de liquidación en formato ISO (opcional, por defecto ahora)",
    example: "2025-10-01T00:00:00.000Z",
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  settlementDate?: Date;

  @Field(() => Int)
  @ApiProperty({ description: "ID del empleado asociado", example: 1 })
  @IsInt()
  employeeId: number;
}
