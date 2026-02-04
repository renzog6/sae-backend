import { Resolver, Query, Args } from "@nestjs/graphql";
import { TiresService } from "./tires.service";
import { Tire } from "./entity/tire.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { Paginated } from "@common/dto/paginated-result.gql";
import { PaginationArgs } from "@common/dto/pagination.args";

const PaginatedTire = Paginated(Tire);

@Resolver(() => Tire)
export class TiresResolver extends BaseResolver(Tire) {
    constructor(private readonly tiresService: TiresService) {
        super(tiresService);
    }

    @Query(() => PaginatedTire, { name: "findAllTires" })
    async findAllTires(@Args() args: PaginationArgs): Promise<any> {
        const query = { ...args, deleted: "exclude" } as any;
        const result = await this.tiresService.findAll(query);
        return result;
    }
}
