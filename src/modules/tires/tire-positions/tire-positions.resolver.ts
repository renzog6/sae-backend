import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { TirePositionsService } from "./tire-positions.service";
import { TirePositionConfig } from "../entities/tire-position-config.entity";
import { CreateTirePositionDto } from "./dto/create-tire-position.dto";
import { UpdateTirePositionDto } from "./dto/update-tire-position.dto";

@Resolver(() => TirePositionConfig)
export class TirePositionsResolver {
    constructor(private readonly tirePositionsService: TirePositionsService) { }

    @Query(() => [TirePositionConfig], { name: "findAllTirePositions" })
    async findAll(
        @Args("axleId", { type: () => Int, nullable: true }) axleId?: number
    ): Promise<TirePositionConfig[]> {
        const result = await this.tirePositionsService.findAll(axleId);
        return result.data;
    }

    @Query(() => TirePositionConfig, { name: "findOneTirePosition", nullable: true })
    async findOne(@Args("id", { type: () => Int }) id: number): Promise<any> {
        const result = await this.tirePositionsService.findOne(id);
        return result.data;
    }

    @Mutation(() => TirePositionConfig, { name: "createTirePosition" })
    async create(@Args("input") input: CreateTirePositionDto): Promise<TirePositionConfig> {
        const result = await this.tirePositionsService.create(input);
        return result.data;
    }

    @Mutation(() => TirePositionConfig, { name: "updateTirePosition" })
    async update(
        @Args("id", { type: () => Int }) id: number,
        @Args("input") input: UpdateTirePositionDto
    ): Promise<TirePositionConfig> {
        const result = await this.tirePositionsService.update(id, input);
        return result.data;
    }

    @Mutation(() => Boolean, { name: "removeTirePosition" })
    async remove(@Args("id", { type: () => Int }) id: number): Promise<boolean> {
        await this.tirePositionsService.remove(id);
        return true;
    }
}
