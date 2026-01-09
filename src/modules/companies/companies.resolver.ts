import { Resolver, Query, Args } from "@nestjs/graphql";
import { CompaniesService } from "./services/companies.service";
import { Company } from "./entities/company.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { PaginatedCompany } from "./dto/paginated-company.dto";
import { PaginationArgs } from "@common/dto/pagination.args";

@Resolver(() => Company)
export class CompaniesResolver extends BaseResolver(Company) {
    constructor(private readonly companiesService: CompaniesService) {
        super(companiesService);
    }

    @Query(() => PaginatedCompany, { name: 'findAllCompanies' })
    async findAll(@Args() args: PaginationArgs): Promise<PaginatedCompany> {
        const query = { ...args, deleted: 'exclude' } as any;
        const result = await this.companiesService.findAll(query);
        return result as any;
    }
}
