// filepath: sae-backend/src/modules/validators/dto/unique-validator.dto.ts
import { IsEnum, IsOptional, IsString, IsNumberString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";

export class UniqueValidatorDto {
  @ApiProperty({
    description: "The Prisma model name to validate uniqueness for",
    example: "Equipment",
  })
  @IsEnum(Prisma.ModelName)
  model: Prisma.ModelName;

  @ApiProperty({
    description: "The field name in the model to check for uniqueness",
    example: "engine",
  })
  @IsString()
  field: string;

  @ApiProperty({
    description: "The value to check if it's unique",
    example: "ABC123",
  })
  @IsString()
  value: string;

  @ApiPropertyOptional({
    description:
      "ID of the record to exclude from uniqueness check (useful for updates)",
    example: "1",
  })
  @IsOptional()
  @IsNumberString()
  excludeId?: string;
}
