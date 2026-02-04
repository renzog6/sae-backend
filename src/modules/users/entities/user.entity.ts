import { ObjectType, Field, Int, registerEnumType } from "@nestjs/graphql";
import { GraphQLJSON } from "@common/scalars/json.scalar";
import { ApiProperty } from "@nestjs/swagger";
import { User as PrismaUser, Role } from "@prisma/client";

registerEnumType(Role, {
  name: "Role",
});

@ObjectType()
export class User implements Partial<PrismaUser> {
  @Field(() => Int)
  @ApiProperty()
  id: number;

  @Field()
  @ApiProperty()
  name: string;

  @Field()
  @ApiProperty()
  email: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  username?: string;

  // Password should NOT be exposed in GraphQL
  @ApiProperty()
  password: string;

  @Field(() => Role)
  @ApiProperty({ enum: Role })
  role: Role;

  @Field(() => GraphQLJSON, { nullable: true })
  @ApiProperty({ required: false })
  preferences?: Record<string, any>;

  @Field(() => Int)
  @ApiProperty()
  companyId: number;

  @Field()
  @ApiProperty()
  isActive: boolean;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  lastLoginAt?: Date;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  deletedAt?: Date;

  @Field()
  @ApiProperty()
  createdAt: Date;

  @Field()
  @ApiProperty()
  updatedAt: Date;
}
