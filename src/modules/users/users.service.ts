// filepath: sae-backend/src/modules/users/services/users.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService extends BaseService<any> {
  private readonly logger = new Logger(UsersService.name);

  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.user;
  }

  protected buildSearchConditions(q: string) {
    return [
      { email: { contains: q, mode: "insensitive" } },
      { name: { contains: q, mode: "insensitive" } },
      { username: { contains: q, mode: "insensitive" } },
    ];
  }

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

  async findAll(
    query: BaseQueryDto = new BaseQueryDto(),
    companyId?: number
  ): Promise<BaseResponseDto<any>> {
    const additionalWhere: any = {};
    if (companyId) {
      additionalWhere.companyId = companyId;
    }

    const include = {
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
    };

    return super.findAll(query, additionalWhere, include);
  }

  async findOne(id: number) {
    const user = await super.findOne(id);

    // Exclude sensitive data
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

  async remove(id: number): Promise<{ message: string }> {
    return await super.remove(id);
  }

  // Add method to update last login
  async updateLastLogin(userId: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    });
  }
}
