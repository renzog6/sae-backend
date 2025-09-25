// file: sae-backend/src/locations/addresses/dto/update-address.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
