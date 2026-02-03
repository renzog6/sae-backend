import { Resolver, Query, Args } from "@nestjs/graphql";
import { CountriesService } from "./countries.service";
import { Country } from "./entities/country.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { PaginatedCountry } from "./dto/paginated-country.dto";
import { PaginationArgs } from "@common/dto/pagination.args";

@Resolver(() => Country)
export class CountriesResolver extends BaseResolver(Country) {
    constructor(private readonly countriesService: CountriesService) {
        super(countriesService);
    }

    @Query(() => PaginatedCountry, { name: "findCountries" })
    async findCountries(
        @Args() pagination: PaginationArgs
    ): Promise<PaginatedCountry> {
        return this.countriesService.findAll(
            { ...pagination, deleted: "exclude" } as any
        ) as any;
    }
}
