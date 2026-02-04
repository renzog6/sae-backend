import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { TireRecapsService } from "./tire-recaps.service";
import { TireRecap } from "../entities/tire-recap.entity";
import { CreateTireRecapDto } from "./dto/create-tire-recap.dto";
import { UpdateTireRecapDto } from "./dto/update-tire-recap.dto";

@Resolver(() => TireRecap)
export class TireRecapsResolver {
    constructor(private readonly tireRecapsService: TireRecapsService) { }

    @Query(() => [TireRecap], { name: "findAllTireRecaps" })
    async findAll(): Promise<TireRecap[]> {
        return this.tireRecapsService.findAll();
    }

    @Query(() => [TireRecap], { name: "findTireRecapsByTire" })
    async findByTire(@Args("tireId", { type: () => Int }) tireId: number): Promise<TireRecap[]> {
        return this.tireRecapsService.findByTire(tireId);
    }

    @Mutation(() => TireRecap, { name: "createTireRecap" })
    async create(@Args("input") input: CreateTireRecapDto): Promise<TireRecap> {
        const result = await this.tireRecapsService.create(input);
        return result.data;
    }

    @Mutation(() => TireRecap, { name: "updateTireRecap" })
    async update(
        @Args("id", { type: () => Int }) id: number,
        @Args("input") input: UpdateTireRecapDto
    ): Promise<TireRecap> {
        const result = await this.tireRecapsService.update(id, input);
        return result.data;
    }

    @Mutation(() => Boolean, { name: "removeTireRecap" })
    async remove(@Args("id", { type: () => Int }) id: number): Promise<boolean> {
        await this.tireRecapsService.remove(id);
        return true;
    }
}
