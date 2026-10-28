import { ApiProperty } from "@nestjs/swagger";
import { User as PrismaUser, Role } from "@prisma/client";

export class User implements Partial<PrismaUser> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  username?: string;

  // Password should NOT be exposed in GraphQL
  @ApiProperty()
  password: string;

  @ApiProperty({ enum: Role })
  role: Role;

  @ApiProperty({ required: false })
  preferences?: Record<string, any>;

  @ApiProperty()
  companyId: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty({ required: false })
  lastLoginAt?: Date;

  @ApiProperty({ required: false })
  deletedAt?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
