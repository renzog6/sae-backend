import { PartialType } from "@nestjs/swagger";
import { CreateHistoryLogDto } from "./create-history-log.dto";

export class UpdateHistoryLogDto extends PartialType(CreateHistoryLogDto) { }
