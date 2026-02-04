import { Resolver, Query, Args } from "@nestjs/graphql";
import { HistoryLogService } from "./services/history-log.service";
import { HistoryLog } from "./entities/history-log.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { Paginated } from "@common/dto/paginated-result.gql";
import { PaginationArgs } from "@common/dto/pagination.args";

const PaginatedHistoryLog = Paginated(HistoryLog);

@Resolver(() => HistoryLog)
export class HistoryResolver extends BaseResolver(HistoryLog) {
    constructor(private readonly historyLogService: HistoryLogService) {
        super(historyLogService);
    }

    @Query(() => PaginatedHistoryLog, { name: "findAllHistoryLogs" })
    async findAllHistoryLogs(@Args() args: PaginationArgs): Promise<any> {
        const query = { ...args, deleted: "exclude" } as any;
        const result = await this.historyLogService.findAll(query);
        return result;
    }
}
