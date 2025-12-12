// filepath: sae-backend/src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

class LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

class UserProfileDto {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  isActive: boolean;
}

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "User authentication",
    description:
      "Authenticates a user with email and password, returning access and refresh tokens along with user information.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully authenticated user",
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Invalid email or password credentials",
  })
  @ApiBadRequestResponse({
    description: "Invalid input data or validation failed",
  })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password
    );
    return this.authService.login(user);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Refresh access token",
    description:
      "Refreshes the access token using a valid refresh token. Returns new access and refresh tokens.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully refreshed tokens",
    type: LoginResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: "Invalid or expired refresh token",
  })
  @ApiBadRequestResponse({
    description: "Invalid refresh token format or missing token",
  })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get user profile",
    description:
      "Retrieves the profile information of the currently authenticated user.",
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved user profile",
    type: UserProfileDto,
  })
  @ApiUnauthorizedResponse({
    description: "Invalid or missing authentication token",
  })
  getProfile(@Request() req) {
    return req.user;
  }
}
