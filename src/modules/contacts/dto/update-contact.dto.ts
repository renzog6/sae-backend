import { PartialType } from "@nestjs/swagger";
import { CreateContactDto } from "./create-contact.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, ValidateIf } from "class-validator";
import { Type } from "class-transformer";

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @ApiPropertyOptional({
    description: "Associated company id or null to unlink",
    example: 1,
    required: false,
  })
  @IsOptional()
  @ValidateIf((o) => o.companyId !== null)
  @Type(() => Number)
  @IsInt()
  companyId?: number | null;

  @ApiPropertyOptional({
    description: "Associated person id or null to unlink",
    example: 1,
    required: false,
  })
  @IsOptional()
  @ValidateIf((o) => o.personId !== null)
  @Type(() => Number)
  @IsInt()
  personId?: number | null;
}
