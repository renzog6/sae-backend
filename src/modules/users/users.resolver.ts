import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { BaseResolver } from "@common/resolvers/base.resolver";

@Resolver(() => User)
export class UsersResolver extends BaseResolver(User, {
    createInput: CreateUserDto,
    updateInput: UpdateUserDto,
}) {
    constructor(private readonly usersService: UsersService) {
        super(usersService);
    }

    @Query(() => User, { name: "findUserByEmail", nullable: true })
    async findByEmail(@Args("email") email: string): Promise<any> {
        const result = await this.usersService.findByEmail(email);
        return result.data;
    }

    @Mutation(() => Boolean, { name: "updateLastLogin" })
    async updateLastLogin(@Args("userId", { type: () => Int }) userId: number): Promise<boolean> {
        await this.usersService.updateLastLogin(userId);
        return true;
    }
}
