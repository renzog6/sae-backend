import { Resolver, Query, Args } from "@nestjs/graphql";
import { InspectionsService } from "./services/inspections.service";
import { Inspection } from "./entities/inspection.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { Paginated } from "@common/dto/paginated-result.gql";
import { PaginationArgs } from "@common/dto/pagination.args";

const PaginatedInspection = Paginated(Inspection);

@Resolver(() => Inspection)
export class InspectionsResolver extends BaseResolver(Inspection) {
    constructor(private readonly inspectionsService: InspectionsService) {
        super(inspectionsService);
    }

    @Query(() => PaginatedInspection, { name: "findAllInspections" })
    async findAllInspections(@Args() args: PaginationArgs): Promise<any> {
        const query = { ...args, deleted: "exclude" } as any;
        const result = await this.inspectionsService.findAll(query);
        return result;
    }
}
