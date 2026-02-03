import { Resolver, Query, Args } from "@nestjs/graphql";
import { ProvincesService } from "./provinces.service";
import { Province } from "./entities/province.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { PaginatedProvince } from "./dto/paginated-province.dto";
import { PaginationArgs } from "@common/dto/pagination.args";

@Resolver(() => Province)
export class ProvincesResolver extends BaseResolver(Province) {
    constructor(private readonly provincesService: ProvincesService) {
        super(provincesService);
    }

    @Query(() => PaginatedProvince, { name: "findProvinces" })
    async findProvinces(
        @Args() pagination: PaginationArgs
    ): Promise<PaginatedProvince> {
        return this.provincesService.findAll(
            { ...pagination, deleted: "exclude" } as any
        ) as any;
    }
}
