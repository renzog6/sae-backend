import { PartialType } from "@nestjs/mapped-types";
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
