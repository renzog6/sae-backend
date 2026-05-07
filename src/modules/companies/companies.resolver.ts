import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { CompaniesService } from "./services/companies.service";
import { Company } from "./entities/company.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { PaginatedCompany } from "./dto/paginated-company.dto";
import { PaginationArgs } from "@common/dto/pagination.args";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Resolver(() => Company)
export class CompaniesResolver extends BaseResolver(Company, {
  createInput: CreateCompanyDto,
  updateInput: UpdateCompanyDto,
}) {
  constructor(private readonly companiesService: CompaniesService) {
    super(companiesService);
  }

  @Query(() => PaginatedCompany, { name: "findAllCompanies" })
  async findAll(@Args() args: PaginationArgs): Promise<PaginatedCompany> {
    const query = { ...args, deleted: "exclude" } as any;
    const result = await this.companiesService.findAll(query);
    return result as any;
  }

  @Mutation(() => Company, { name: "createCompany" })
  async create(
    @Args("input", { type: () => CreateCompanyDto }) input: CreateCompanyDto,
  ): Promise<Company> {
    const result = await this.companiesService.create(input);
    return result as any;
  }

  @Mutation(() => Company, { name: "updateCompany" })
  async update(
    @Args("id") id: string,
    @Args("input", { type: () => UpdateCompanyDto }) input: UpdateCompanyDto,
  ): Promise<Company> {
    const result = await this.companiesService.update(id, input);
    return result as any;
  }
}
