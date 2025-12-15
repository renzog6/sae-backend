import { IsString, IsOptional, IsInt, IsDateString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateInspectionDto {
    @ApiProperty({ default: new Date() })
    @IsDateString()
    @IsOptional()
    date?: string;

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
