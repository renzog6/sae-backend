import { Resolver, Query, Args } from "@nestjs/graphql";
import { BusinessCategoriesService } from "./business-categories.service";
import { BusinessCategory } from "./entities/business-category.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { PaginatedBusinessCategory } from "./dto/paginated-business-category.dto";
import { PaginationArgs } from "@common/dto/pagination.args";

@Resolver(() => BusinessCategory)
export class BusinessCategoriesResolver extends BaseResolver(BusinessCategory) {
    constructor(private readonly service: BusinessCategoriesService) {
        super(service);
    }

    @Query(() => PaginatedBusinessCategory, { name: 'findAllBusinessCategories' })
    async findAll(@Args() args: PaginationArgs): Promise<PaginatedBusinessCategory> {
        const query = { ...args, deleted: 'exclude' } as any;
        const result = await this.service.findAll(query);
        return result as any;
    }
}
