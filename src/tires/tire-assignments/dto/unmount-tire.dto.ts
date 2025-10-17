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

  @ApiProperty({ example: "Unmount due to rotation", required: false })
  @IsOptional()
  @IsString()
  note?: string;
}
