import { Resolver } from "@nestjs/graphql";
import { HistoryLogService } from "./services/history-log.service";
import { HistoryLog } from "./entities/history-log.entity";
import { BaseResolver } from "@common/resolvers/base.resolver";
import { CreateHistoryLogDto } from "./dto/create-history-log.dto";
import { UpdateHistoryLogDto } from "./dto/update-history-log.dto";

@Resolver(() => HistoryLog)
export class HistoryResolver extends BaseResolver(HistoryLog, {
    createInput: CreateHistoryLogDto,
    updateInput: UpdateHistoryLogDto,
}) {
    constructor(private readonly historyLogService: HistoryLogService) {
        super(historyLogService);
    }
}
