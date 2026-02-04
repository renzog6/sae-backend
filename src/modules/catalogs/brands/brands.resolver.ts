import { Resolver, Query, Args } from "@nestjs/graphql";
import { BrandsService } from "./brands.service";
import { Brand } from "./entities/brand.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { Paginated } from "@common/dto/paginated-result.gql";
import { PaginationArgs } from "@common/dto/pagination.args";

const PaginatedBrand = Paginated(Brand);

@Resolver(() => Brand)
export class BrandsResolver extends BaseResolver(Brand) {
    constructor(private readonly brandsService: BrandsService) {
        super(brandsService);
    }

    @Query(() => PaginatedBrand, { name: "findAllBrands" })
    async findAllBrands(@Args() args: PaginationArgs): Promise<any> {
        const query = { ...args, deleted: "exclude" } as any;
        const result = await this.brandsService.findAll(query);
        return result;
    }
}
