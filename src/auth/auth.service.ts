// filepath: sae-backend/src/auth/auth.service.ts
import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      this.logger.warn(`Failed login attempt for non-existent user: ${email}`);
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      this.logger.warn(`Failed login attempt for user: ${email}`);
      throw new UnauthorizedException("Invalid credentials");
    }

    // Remove password from returned user object
    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_SECRET"),
      expiresIn: this.configService.get<string>("JWT_EXPIRATION") || "1d",
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret:
        this.configService.get<string>("JWT_REFRESH_SECRET") ||
        "changeme-refresh",
      expiresIn:
        this.configService.get<string>("JWT_REFRESH_EXPIRATION") || "7d",
    });

    // Update last login timestamp
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    this.logger.log(`User logged in: ${user.email}`);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get("JWT_REFRESH_SECRET"),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException("Invalid token");
      }

      return this.login(user);
    } catch (error) {
      this.logger.error("Error refreshing token", error);
      throw new UnauthorizedException("Invalid token");
    }
  }
}
