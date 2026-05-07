//filepath: sae-backend/src/modules/catalogs/brands/dto/create-brand.dto.ts
import { InputType, Field } from "@nestjs/graphql";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@InputType()
export class CreateBrandDto {
  @ApiProperty({
    description: "Name of the brand",
    example: "Michelin",
  })
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: "Unique code for the brand",
    example: "MICH",
  })
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiPropertyOptional({
    description: "Additional information about the brand",
  })
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  information?: string;

  @ApiPropertyOptional({
    description: "Whether the brand is active",
    example: true,
  })
  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: "Deletion date for soft delete",
    example: "2024-01-01T00:00:00.000Z",
  })
  @Field(() => String, { nullable: true })
  @IsDateString()
  @IsOptional()
  deletedAt?: string;
}
