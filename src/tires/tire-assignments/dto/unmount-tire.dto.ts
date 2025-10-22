// fliept: sae-backend/src/tires/tire-assignments/dto/unmount-tire.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

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
  @IsString()
  unmountDate?: string;

  @ApiProperty({
    example: "IN_STOCK",
    description: "New status for the tire after unmounting",
    enum: ["IN_STOCK", "UNDER_REPAIR", "RECAP", "DISCARDED"],
    required: false,
  })
  @IsOptional()
  @IsString()
  newStatus?: "IN_STOCK" | "UNDER_REPAIR" | "RECAP" | "DISCARDED";

  @ApiProperty({ example: "Unmount due to rotation", required: false })
  @IsOptional()
  @IsString()
  note?: string;
}
