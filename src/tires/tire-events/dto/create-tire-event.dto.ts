// filepath: sae-backend/src/tires/tire-events/dto/create-tire-event.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsInt, IsObject, IsOptional, IsString } from "class-validator";
import { TireEventType } from "@prisma/client";
import { Type } from "class-transformer";

export class CreateTireEventDto {
  @ApiProperty({ example: 1, description: "ID del neumático" })
  @IsInt()
  tireId: number;

  @ApiProperty({ 
    enum: TireEventType, 
    example: "ASSIGNMENT", 
    description: "Tipo de evento" 
  })
  @IsEnum(TireEventType)
  type: TireEventType;

  @ApiProperty({ example: "Neumático montado en posición E1I", description: "Descripción del evento" })
  @IsString()
  description: string;

  @ApiProperty({ example: new Date(), description: "Fecha del evento", required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;

  @ApiProperty({ example: 50000, description: "Kilometraje al momento del evento", required: false })
  @IsOptional()
  @IsInt()
  kmAtEvent?: number;

  @ApiProperty({ 
    example: { positionConfigId: 1 }, 
    description: "Datos adicionales del evento", 
    required: false 
  })
  @IsOptional()
  @IsObject()
  data?: Record<string, any>;
}