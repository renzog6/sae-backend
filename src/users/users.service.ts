// filepath: sae-backend/src/users/users.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import {
  PaginationDto,
  PaginatedResponseDto,
} from "../common/dto/pagination.dto";
import { Role } from "@prisma/client";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        companyId: createUserDto.companyId ?? 1, // Default to 1 if not provided
        isActive: createUserDto.isActive ?? true, // Default to true if not provided
      },
    });

    const { password, ...result } = user;
    return result;
  }

  async findAll(paginationDto: PaginationDto, companyId?: number) {
    const { page, limit, skip } = paginationDto;

    const where: any = {
      deletedAt: null, // Soft delete filter
    };

    if (companyId) {
      where.companyId = companyId;
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        where,
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
          role: true,
          preferences: true,
          companyId: true,
          isActive: true,
          lastLoginAt: true,
          deletedAt: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return new PaginatedResponseDto(users, total, page, limit);
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id, deletedAt: null }, // Soft delete filter
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const { password, ...result } = user;
    return result;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email, deletedAt: null }, // Soft delete filter
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    const { password, ...result } = user;
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    if (updateUserDto.email) {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          email: updateUserDto.email,
          id: { not: id },
          deletedAt: null, // Soft delete filter
        },
      });

      if (existingUser) {
        throw new ConflictException("Email already in use");
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    const { password, ...result } = updatedUser;
    return result;
  }

  async remove(id: number) {
    await this.findOne(id);

    // Soft delete instead of hard delete
    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { id };
  }

  // Add method to update last login
  async updateLastLogin(userId: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    });
  }
}
