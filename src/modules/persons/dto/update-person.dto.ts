// filepath: sae-backend/src/modules/persons/dto/update-person.dto.ts
import { PartialType } from "@nestjs/swagger";
import { CreatePersonDto } from "./create-person.dto";

export class UpdatePersonDto extends PartialType(CreatePersonDto) {}
