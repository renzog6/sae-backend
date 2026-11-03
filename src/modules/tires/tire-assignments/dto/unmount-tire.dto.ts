import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsEnum, IsDate } from "class-validator";
import { TireStatus } from "@prisma/client";
import { Type } from "class-transformer";

export class UnmountTireDto {
  @ApiProperty({
    example: 1,
    description: "Assignment id to close (tire assignment record)",
  })
  @IsInt()
  assignmentId: number;

  @ApiProperty({
    example: 151200,
    description: "KM odometer reading at unmount time",
    required: false,
  })
  @IsOptional()
  @IsInt()
  kmAtEnd?: number;

  @ApiProperty({
    example: "2025-01-15",
    description: "Date when the tire was unmounted",
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  unmountDate?: Date;

  @ApiProperty({
    example: TireStatus.IN_STOCK,
    description: "New status for the tire after unmounting",
    enum: TireStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(TireStatus)
  newStatus?: TireStatus;

  @ApiProperty({ example: "Unmount due to rotation", required: false })
  @IsOptional()
  @IsString()
  note?: string;
}
