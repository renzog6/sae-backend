import { InputType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";

@InputType()
export class MountTireDto {
  @Field(() => Int)
  @ApiProperty({ example: 1, description: "Tire id" })
  @IsInt()
  tireId: number;

  @Field(() => Int)
  @ApiProperty({
    example: 1,
    description: "Position configuration ID (references TirePositionConfig)",
  })
  @IsInt()
  positionConfigId: number;

  @Field(() => Int, { nullable: true })
  @ApiProperty({
    example: 150000,
    description: "KM odometer reading at mount time",
    required: false,
  })
  @IsOptional()
  @IsInt()
  kmAtStart?: number;

  @Field(() => Date, { nullable: true })
  @ApiProperty({
    example: "2025-01-15",
    description: "Date when the tire was mounted",
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  mountDate?: Date;

  @Field({ nullable: true })
  @ApiProperty({ example: "Mount for seasonal campaign", required: false })
  @IsOptional()
  @IsString()
  note?: string;

  // Campos para compatibilidad con implementación anterior (deprecated)
  @Field(() => Int, { nullable: true })
  @ApiProperty({
    example: 123,
    description:
      "Equipment id where mount will happen (deprecated, use positionConfigId instead)",
    required: false,
  })
  @IsOptional()
  @IsInt()
  equipmentId?: number;

  @Field({ nullable: true })
  @ApiProperty({
    example: "E2I",
    description:
      "Position (enum TirePosition) (deprecated, use positionConfigId instead)",
    required: false,
  })
  @IsOptional()
  @IsString()
  position?: string;
}
