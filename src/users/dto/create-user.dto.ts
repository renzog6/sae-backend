// filepath: sae-backend/src/users/dto/create-user.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { Role } from "@prisma/client";

export class CreateUserDto {
  @ApiProperty({
    description: "User email",
    example: "user@example.com",
  })
  @IsEmail({}, { message: "Please provide a valid email" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @ApiProperty({
    description: "User password",
    example: "password123",
  })
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;

  @ApiProperty({
    description: "User name",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @ApiProperty({
    description: "Username",
    example: "UserX",
    required: false,
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: "User role",
    enum: Role,
    default: Role.USER,
    required: false,
  })
  @IsEnum(Role, { message: "Invalid role" })
  @IsOptional()
  role?: Role;
}
