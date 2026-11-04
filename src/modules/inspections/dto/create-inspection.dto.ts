import { IsString, IsOptional, IsInt, IsDate } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateInspectionDto {
    @ApiProperty({ default: "2026-01-01T00:00:00.000Z" })
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    date?: Date;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    observation?: string;

    @ApiProperty()
    @IsInt()
    equipmentId: number;

    @ApiProperty()
    @IsInt()
    employeeId: number;

    @ApiProperty()
    @IsInt()
    inspectionTypeId: number;
}
