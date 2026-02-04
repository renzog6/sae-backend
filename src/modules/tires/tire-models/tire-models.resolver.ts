import { Resolver, Query, Args } from "@nestjs/graphql";
import { TireModelsService } from "./tire-models.service";
import { TireModel } from "./entity/tire-model.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { Paginated } from "@common/dto/paginated-result.gql";
import { PaginationArgs } from "@common/dto/pagination.args";
import { CreateTireModelDto } from "./dto/create-tire-model.dto";
import { UpdateTireModelDto } from "./dto/update-tire-model.dto";

const PaginatedTireModel = Paginated(TireModel);

@Resolver(() => TireModel)
export class TireModelsResolver extends BaseResolver(TireModel, {
    createInput: CreateTireModelDto,
    updateInput: UpdateTireModelDto,
}) {
    constructor(private readonly tireModelsService: TireModelsService) {
        super(tireModelsService);
    }

    @Query(() => PaginatedTireModel, { name: "findAllTireModels" })
    async findAllTireModels(@Args() args: PaginationArgs): Promise<any> {
        const query = { ...args, deleted: "exclude" } as any;
        const result = await this.tireModelsService.findAll(query);
        return result;
    }
}
