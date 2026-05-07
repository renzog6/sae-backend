import { Resolver, Query, Args, Mutation, Int } from "@nestjs/graphql";
import { BrandsService } from "./brands.service";
import { Brand } from "./entities/brand.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { Paginated } from "@common/dto/paginated-result.gql";
import { PaginationArgs } from "@common/dto/pagination.args";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";

const PaginatedBrand = Paginated(Brand);

@Resolver(() => Brand)
export class BrandsResolver extends BaseResolver(Brand, {
  createInput: CreateBrandDto,
  updateInput: UpdateBrandDto,
}) {
  constructor(private readonly brandsService: BrandsService) {
    super(brandsService);
  }

  @Query(() => PaginatedBrand, { name: "findAllBrands" })
  async findAllBrands(@Args() args: PaginationArgs): Promise<any> {
    const query = { ...args, deleted: "exclude" } as any;
    const result = await this.brandsService.findAll(query);
    return result;
  }

  @Mutation(() => Brand, { name: "createBrand" })
  async create(
    @Args("input", { type: () => CreateBrandDto }) input: CreateBrandDto,
  ): Promise<Brand> {
    const result = await this.brandsService.create(input);
    return result as any;
  }

  @Mutation(() => Brand, { name: "updateBrand" })
  async update(
    @Args("id", { type: () => Int }) id: number,
    @Args("input", { type: () => UpdateBrandDto }) input: UpdateBrandDto,
  ): Promise<Brand> {
    const result = await this.brandsService.update(id, input);
    return result as any;
  }
}
