import { Resolver, Query, Args } from "@nestjs/graphql";
import { BusinessSubcategoriesService } from "./business-subcategories.service";
import { BusinessSubCategory } from "./entities/business-subcategory.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { PaginatedBusinessSubCategory } from "./dto/paginated-business-subcategory.dto";
import { PaginationArgs } from "@common/dto/pagination.args";

@Resolver(() => BusinessSubCategory)
export class BusinessSubCategoriesResolver extends BaseResolver(BusinessSubCategory) {
    constructor(private readonly service: BusinessSubcategoriesService) {
        super(service);
    }

    @Query(() => PaginatedBusinessSubCategory, { name: 'findAllBusinessSubCategories' })
    async findAll(@Args() args: PaginationArgs): Promise<PaginatedBusinessSubCategory> {
        const query = { ...args, deleted: 'exclude' } as any;
        const result = await this.service.findAll(query);
        return result as any;
    }
}
