// filepath: sae-backend/src/modules/tires/tire-events/dto/create-tire-event.dto.ts
import { InputType, Field, Int } from "@nestjs/graphql";
import { GraphQLJSON } from "@common/scalars/json.scalar";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
} from "class-validator";
import { TireEventType } from "@prisma/client";
import { Type } from "class-transformer";

@InputType()
export class CreateTireEventDto {
  @Field(() => Int)
  @ApiProperty({ example: 1, description: "ID del neumático" })
  @IsInt()
  tireId: number;

  @Field(() => TireEventType)
  @ApiProperty({
    enum: TireEventType,
    example: "ASSIGNMENT",
    description: "Tipo de evento",
  })
  @IsEnum(TireEventType)
  type: TireEventType;

  @Field(() => String)
  @ApiProperty({
    example: "Neumático montado en posición E1I",
    description: "Descripción del evento",
  })
  @IsString()
  description: string;

  @Field(() => Date, { nullable: true })
  @ApiProperty({
    example: new Date(),
    description: "Fecha del evento",
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;

  @Field(() => Int, { nullable: true })
  @ApiProperty({
    example: 50000,
    description: "Kilometraje al momento del evento",
    required: false,
  })
  @IsOptional()
  @IsInt()
  kmAtEvent?: number;

  @Field(() => GraphQLJSON, { nullable: true })
  @ApiProperty({
    example: { positionConfigId: 1 },
    description: "Datos adicionales del evento",
    required: false,
  })
  @IsOptional()
  @IsObject()
  data?: Record<string, any>;
}
