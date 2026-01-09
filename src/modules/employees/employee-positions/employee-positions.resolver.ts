import { Resolver, Query, Args } from "@nestjs/graphql";
import { EmployeePositionsService } from "./employee-positions.service";
import { EmployeePosition } from "./entities/employee-position.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { PaginatedEmployeePosition } from "./dto/paginated-employee-position.dto";
import { PaginationArgs } from "@common/dto/pagination.args";

@Resolver(() => EmployeePosition)
export class EmployeePositionsResolver extends BaseResolver(EmployeePosition) {
    constructor(private readonly positionsService: EmployeePositionsService) {
        super(positionsService);
    }

    @Query(() => PaginatedEmployeePosition, { name: 'findAllEmployeePositions' })
    async findAll(@Args() args: PaginationArgs): Promise<PaginatedEmployeePosition> {
        const query = { ...args, deleted: 'exclude' } as any;
        const result = await this.positionsService.findAll(query);
        return result as any;
    }
}
