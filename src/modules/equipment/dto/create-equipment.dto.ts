import { InputType, Field, Int } from "@nestjs/graphql";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { EquipmentStatus, FuelType } from "@prisma/client";

@InputType()
export class CreateEquipmentDto {
  @Field({ nullable: true })
  @ApiPropertyOptional({ description: "Internal equipment code" })
  @IsString()
  @IsOptional()
  internalCode?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ description: "Equipment name" })
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ description: "Equipment description" })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ description: "Equipment observation" })
  @IsString()
  @IsOptional()
  observation?: string;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ description: "Equipment year" })
  @IsNumber()
  @IsOptional()
  year?: number;

  @Field({ nullable: true })
  @ApiPropertyOptional({ description: "Equipment license plate" })
  @IsString()
  @IsOptional()
  licensePlate?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ description: "Equipment chassis number" })
  @IsString()
  @IsOptional()
  chassis?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ description: "Equipment engine number" })
  @IsString()
  @IsOptional()
  engine?: string;

  @Field({ nullable: true })
  @ApiPropertyOptional({ description: "Equipment color" })
  @IsString()
  @IsOptional()
  color?: string;

  @Field(() => FuelType, { nullable: true })
  @ApiPropertyOptional({
    description: "Equipment fuel type",
    enum: FuelType,
  })
  @IsEnum(FuelType)
  @IsOptional()
  fuelType?: FuelType;

  @Field(() => EquipmentStatus, { nullable: true })
  @ApiPropertyOptional({
    description: "Equipment status",
    enum: EquipmentStatus,
    default: EquipmentStatus.ACTIVE,
  })
  @IsEnum(EquipmentStatus)
  @IsOptional()
  status?: EquipmentStatus;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ description: "Company ID" })
  @IsNumber()
  @IsOptional()
  companyId?: number;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ description: "Equipment category ID" })
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ description: "Equipment type ID" })
  @IsNumber()
  @IsOptional()
  typeId?: number;

  @Field(() => Int, { nullable: true })
  @ApiPropertyOptional({ description: "Equipment model ID" })
  @IsNumber()
  @IsOptional()
  modelId?: number;
}
