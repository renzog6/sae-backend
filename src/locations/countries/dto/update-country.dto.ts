// file: sae-backend/src/locations/countries/dto/update-country.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateCountryDto } from './create-country.dto';

export class UpdateCountryDto extends PartialType(CreateCountryDto) {}
