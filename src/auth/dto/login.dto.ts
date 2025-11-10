// filepath: sae-backend/src/auth/dto/login.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: "User email",
    example: "admin@rcmsa.ar",
  })
  @IsEmail({}, { message: "Please provide a valid email" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @ApiProperty({
    description: "User password",
    example: "resconi.843",
  })
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;
}
