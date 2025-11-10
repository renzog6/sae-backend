//filepath: sae-backend/src/modules/employees/employee-positions/dto/create-employee-position.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateEmployeePositionDto {
  @ApiProperty({ example: "Supervisor" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: "SUP", required: false })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  code?: string;

  @ApiProperty({ example: "Posición de supervisión", required: false })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  information?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
