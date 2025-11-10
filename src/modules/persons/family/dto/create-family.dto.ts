// filepath: sae-backend/src/modules/persons/family/dto/create-family.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateFamilyDto {
  @ApiProperty({ example: "Padre" })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  relationship!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  personId!: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  @IsNotEmpty()
  relativeId!: number;
}
