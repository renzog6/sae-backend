//filepath: sae-backend/src/modules/catalogs/brands/dto/update-brand.dto.ts
import { InputType, PartialType } from "@nestjs/graphql";
import { CreateBrandDto } from "./create-brand.dto";

@InputType()
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
