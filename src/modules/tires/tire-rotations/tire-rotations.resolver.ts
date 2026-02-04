import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { TireRotationsService } from "./tire-rotations.service";
import { TireRotation } from "../entities/tire-rotation.entity";
import { CreateTireRotationDto } from "./dto/create-tire-rotation.dto";
import { UpdateTireRotationDto } from "./dto/update-tire-rotation.dto";

@Resolver(() => TireRotation)
export class TireRotationsResolver {
    constructor(private readonly tireRotationsService: TireRotationsService) { }

    @Query(() => [TireRotation], { name: "findAllTireRotations" })
    async findAll(): Promise<TireRotation[]> {
        return this.tireRotationsService.findAll();
    }

    @Query(() => TireRotation, { name: "findOneTireRotation", nullable: true })
    async findOne(@Args("id", { type: () => Int }) id: number): Promise<any> {
        const result = await this.tireRotationsService.findOne(id);
        return result.data;
    }

    @Query(() => [TireRotation], { name: "findTireRotationsByTire" })
    async findByTire(@Args("tireId", { type: () => Int }) tireId: number): Promise<TireRotation[]> {
        return this.tireRotationsService.findByTire(tireId);
    }

    @Mutation(() => TireRotation, { name: "createTireRotation" })
    async create(@Args("input") input: CreateTireRotationDto): Promise<TireRotation> {
        const result = await this.tireRotationsService.create(input);
        return result.data;
    }

    @Mutation(() => TireRotation, { name: "updateTireRotation" })
    async update(
        @Args("id", { type: () => Int }) id: number,
        @Args("input") input: UpdateTireRotationDto
    ): Promise<TireRotation> {
        const result = await this.tireRotationsService.update(id, input);
        return result.data;
    }

    @Mutation(() => Boolean, { name: "removeTireRotation" })
    async remove(@Args("id", { type: () => Int }) id: number): Promise<boolean> {
        await this.tireRotationsService.remove(id);
        return true;
    }
}
