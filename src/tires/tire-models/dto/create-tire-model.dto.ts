//filepath: sae-backend/src/tires/tire-models/dto/create-tire-model.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber, IsInt } from "class-validator";

export class CreateTireModelDto {
  @ApiProperty({
    example: 1,
    description: "Brand ID (foreign key)",
  })
  @IsInt()
  brandId: number;

  @ApiProperty({
    example: 1,
    description: "Tire size ID (foreign key)",
  })
  @IsInt()
  sizeId: number;

  @ApiProperty({
    example: "Agribib",
    description: "Model name",
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 142,
    description: "Load index",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  loadIndex?: number;

  @ApiProperty({
    example: "A8",
    description: "Speed symbol",
    required: false,
  })
  @IsOptional()
  @IsString()
  speedSymbol?: string;

  @ApiProperty({
    example: "8PR",
    description: "Ply rating",
    required: false,
  })
  @IsOptional()
  @IsString()
  plyRating?: string;

  @ApiProperty({
    example: "R-1W",
    description: "Tread pattern",
    required: false,
  })
  @IsOptional()
  @IsString()
  treadPattern?: string;

  @ApiProperty({
    example: "Neumático agrícola de alto rendimiento",
    description: "Additional information",
    required: false,
  })
  @IsOptional()
  @IsString()
  information?: string;
}
