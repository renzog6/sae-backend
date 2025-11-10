// filepath: sae-backend/src/modules/users/dto/update-user.dto.ts
import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsDateString } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: "Soft delete timestamp",
    example: "2023-12-01T00:00:00.000Z",
    required: false,
  })
  @IsDateString()
  @IsOptional()
  deletedAt?: string;
}
