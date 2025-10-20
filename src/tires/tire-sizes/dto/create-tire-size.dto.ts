//filepath: sae-backend/src/tires/tire-sizes/dto/create-tire-size.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreateTireSizeDto {
  @ApiProperty({
    example: "380/90R46",
    description: "Main tire size code",
  })
  @IsString()
  mainCode: string;

  @ApiProperty({
    example: 380,
    description: "Width in mm",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  width?: number;

  @ApiProperty({
    example: 90,
    description: "Aspect ratio",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  aspectRatio?: number;

  @ApiProperty({
    example: 46,
    description: "Rim diameter in inches",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  rimDiameter?: number;

  @ApiProperty({
    example: "R",
    description: "Construction type (R for Radial, D for Diagonal)",
    required: false,
  })
  @IsOptional()
  @IsString()
  construction?: string;

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
    example: "Neumático agrícola radial de gran tamaño",
    description: "Additional information",
    required: false,
  })
  @IsOptional()
  @IsString()
  information?: string;
}
