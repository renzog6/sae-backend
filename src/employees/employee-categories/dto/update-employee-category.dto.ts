import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeCategoryDto } from './create-employee-category.dto';

export class UpdateEmployeeCategoryDto extends PartialType(CreateEmployeeCategoryDto) {}
