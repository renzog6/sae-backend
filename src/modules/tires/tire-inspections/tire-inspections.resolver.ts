import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { TireInspectionsService } from "./tire-inspections.service";
import { TireInspection } from "../entities/tire-inspection.entity";
import { CreateTireInspectionDto } from "./dto/create-tire-inspection.dto";
import { UpdateTireInspectionDto } from "./dto/update-tire-inspection.dto";
import { TireInspectionsQueryDto } from "./dto/tire-inspections-query.dto";
import { Paginated } from "@common/dto/paginated-result.gql";

const PaginatedTireInspection = Paginated(TireInspection);

@Resolver(() => TireInspection)
export class TireInspectionsResolver {
    constructor(private readonly tireInspectionsService: TireInspectionsService) { }

    @Query(() => PaginatedTireInspection, { name: "findAllTireInspections" })
    async findAll(@Args("query", { nullable: true }) query: TireInspectionsQueryDto): Promise<any> {
        return this.tireInspectionsService.findAll(query);
    }

    @Query(() => TireInspection, { name: "findOneTireInspection", nullable: true })
    async findOne(@Args("id", { type: () => Int }) id: number): Promise<any> {
        const result = await this.tireInspectionsService.findOne(id);
        return result.data;
    }

    @Query(() => [TireInspection], { name: "findTireInspectionsByTire" })
    async findByTire(@Args("tireId", { type: () => Int }) tireId: number): Promise<TireInspection[]> {
        return this.tireInspectionsService.findByTire(tireId);
    }

    @Mutation(() => TireInspection, { name: "createTireInspection" })
    async create(@Args("input") input: CreateTireInspectionDto): Promise<TireInspection> {
        const result = await this.tireInspectionsService.create(input);
        return result.data;
    }

    @Mutation(() => TireInspection, { name: "updateTireInspection" })
    async update(
        @Args("id", { type: () => Int }) id: number,
        @Args("input") input: UpdateTireInspectionDto
    ): Promise<TireInspection> {
        const result = await this.tireInspectionsService.update(id, input);
        return result.data;
    }

    @Mutation(() => Boolean, { name: "removeTireInspection" })
    async remove(@Args("id", { type: () => Int }) id: number): Promise<boolean> {
        await this.tireInspectionsService.remove(id);
        return true;
    }
}
