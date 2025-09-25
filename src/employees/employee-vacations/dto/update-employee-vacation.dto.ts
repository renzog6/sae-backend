import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeVacationDto } from './create-employee-vacation.dto';

export class UpdateEmployeeVacationDto extends PartialType(CreateEmployeeVacationDto) {}
