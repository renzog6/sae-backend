import { InputType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsEnum } from "class-validator";
import { TireStatus, TirePosition } from "@prisma/client";

@InputType()
export class CreateTireDto {
  @Field()
  @ApiProperty({
    example: "SN-0012456",
    description: "Unique serial number of the tire",
  })
  @IsString()
  serialNumber: string;

  @Field(() => Int)
  @ApiProperty({
    example: 1,
    description: "Tire model ID (foreign key)",
  })
  @IsInt()
  modelId: number;

  @Field(() => TirePosition, { nullable: true })
  @ApiProperty({ enum: TirePosition, required: false })
  @IsOptional()
  @IsEnum(TirePosition)
  position?: TirePosition;

  @Field(() => TireStatus, { nullable: true })
  @ApiProperty({ enum: TireStatus, default: TireStatus.IN_STOCK })
  @IsOptional()
  @IsEnum(TireStatus)
  status?: TireStatus;

  @Field(() => Int, { nullable: true })
  @ApiProperty({
    example: 0,
    description: "Total kilometers accumulated",
    required: false,
  })
  @IsOptional()
  @IsInt()
  totalKm?: number;
}
