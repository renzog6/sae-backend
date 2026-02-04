import { Resolver, Query, Args } from "@nestjs/graphql";
import { TireSizesService } from "./tire-sizes.service";
import { TireSize } from "./entity/tire-size.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { Paginated } from "@common/dto/paginated-result.gql";
import { PaginationArgs } from "@common/dto/pagination.args";

const PaginatedTireSize = Paginated(TireSize);

@Resolver(() => TireSize)
export class TireSizesResolver extends BaseResolver(TireSize) {
    constructor(private readonly tireSizesService: TireSizesService) {
        super(tireSizesService);
    }

    @Query(() => PaginatedTireSize, { name: "findAllTireSizes" })
    async findAllTireSizes(@Args() args: PaginationArgs): Promise<any> {
        const query = { ...args, deleted: "exclude" } as any;
        const result = await this.tireSizesService.findAll(query);
        return result;
    }
}
