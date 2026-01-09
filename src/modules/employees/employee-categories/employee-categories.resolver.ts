import { Resolver, Query, Args } from "@nestjs/graphql";
import { EmployeeCategoriesService } from "./employee-categories.service";
import { EmployeeCategory } from "./entities/employee-category.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { PaginatedEmployeeCategory } from "./dto/paginated-employee-category.dto";
import { PaginationArgs } from "@common/dto/pagination.args";

@Resolver(() => EmployeeCategory)
export class EmployeeCategoriesResolver extends BaseResolver(EmployeeCategory) {
    constructor(private readonly categoriesService: EmployeeCategoriesService) {
        super(categoriesService);
    }

    @Query(() => PaginatedEmployeeCategory, { name: 'findAllEmployeeCategories' })
    async findAll(@Args() args: PaginationArgs): Promise<PaginatedEmployeeCategory> {
        const query = { ...args, deleted: 'exclude' } as any;
        const result = await this.categoriesService.findAll(query);
        return result as any;
    }
}
