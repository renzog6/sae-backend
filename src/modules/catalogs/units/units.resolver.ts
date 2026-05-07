import { Resolver, Query, Args, Mutation, Int } from "@nestjs/graphql";
import { UnitsService } from "./units.service";
import { Unit } from "./entities/unit.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { Paginated } from "@common/dto/paginated-result.gql";
import { PaginationArgs } from "@common/dto/pagination.args";

import { CreateUnitDto } from "./dto/create-unit.dto";
import { UpdateUnitDto } from "./dto/update-unit.dto";

const PaginatedUnit = Paginated(Unit);

@Resolver(() => Unit)
export class UnitsResolver extends BaseResolver(Unit, {
  createInput: CreateUnitDto,
  updateInput: UpdateUnitDto,
}) {
  constructor(private readonly unitsService: UnitsService) {
    super(unitsService);
  }

  @Query(() => PaginatedUnit, { name: "findAllUnits" })
  async findAllUnits(@Args() args: PaginationArgs): Promise<any> {
    const query = { ...args, deleted: "exclude" } as any;
    const result = await this.unitsService.findAll(query);
    return result;
  }

  @Mutation(() => Unit, { name: "createUnit" })
  async create(
    @Args("input", { type: () => CreateUnitDto }) input: CreateUnitDto,
  ): Promise<Unit> {
    const result = await this.unitsService.create(input);
    return result as any;
  }

  @Mutation(() => Unit, { name: "updateUnit" })
  async update(
    @Args("id", { type: () => Int }) id: number,
    @Args("input", { type: () => UpdateUnitDto }) input: UpdateUnitDto,
  ): Promise<Unit> {
    const result = await this.unitsService.update(id, input);
    return result as any;
  }
}
