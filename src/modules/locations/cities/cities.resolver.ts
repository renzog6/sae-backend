import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CitiesService } from "./cities.service";
import { City } from "./entities/city.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { PaginatedCity } from "./dto/paginated-city.dto";
import { PaginationArgs } from "@common/dto/pagination.args";
import { CreateCityInput, UpdateCityInput } from "./dto/city-input.dto";

@Resolver(() => City)
export class CitiesResolver extends BaseResolver(City) {
    constructor(private readonly citiesService: CitiesService) {
        super(citiesService);
    }

    @Query(() => PaginatedCity, { name: "findCities" })
    async findCities(
        @Args() pagination: PaginationArgs
    ): Promise<PaginatedCity> {
        return this.citiesService.findAll(
            { ...pagination, deleted: "exclude" } as any
        ) as any;
    }

    @Mutation(() => City)
    async createCity(
        @Args("input") input: CreateCityInput
    ): Promise<City> {
        const result = await this.citiesService.create(input as any);
        return result.data as any;
    }

    @Mutation(() => City)
    async updateCity(
        @Args("id", { type: () => Int }) id: number,
        @Args("input") input: UpdateCityInput
    ): Promise<City> {
        const result = await this.citiesService.update(id, input as any);
        return result.data as any;
    }

    @Mutation(() => City)
    async deleteCity(
        @Args("id", { type: () => Int }) id: number
    ): Promise<City> {
        return this.remove(id);
    }
}
