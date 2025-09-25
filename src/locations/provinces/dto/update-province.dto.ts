// file: sae-backend/src/locations/provinces/dto/update-province.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateProvinceDto } from './create-province.dto';

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {}
