import { PartialType } from "@nestjs/mapped-types";
import { CreateHistoryLogDto } from "./create-history-log.dto";

export class UpdateHistoryLogDto extends PartialType(CreateHistoryLogDto) { }
