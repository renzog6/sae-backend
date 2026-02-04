import { InputType, PartialType } from "@nestjs/graphql";
import { CreateHistoryLogDto } from "./create-history-log.dto";

@InputType()
export class UpdateHistoryLogDto extends PartialType(CreateHistoryLogDto) { }
