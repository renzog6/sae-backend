import { ApiProperty } from "@nestjs/swagger";
import { Employee as PrismaEmployee, EmployeeStatus } from "@prisma/client";
import { Person } from "@modules/persons/entities/person.entity";
import { EmployeeCategory } from "../employee-categories/entities/employee-category.entity";
import { EmployeePosition } from "../employee-positions/entities/employee-position.entity";
import { Company } from "@modules/companies/entities/company.entity";

// Registrar el enum en GraphQL

export class Employee implements Partial<PrismaEmployee> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  employeeCode: string;

  @ApiProperty({ required: false })
  information?: string;

  @ApiProperty({ enum: EmployeeStatus })
  status: EmployeeStatus;

  @ApiProperty()
  hireDate: Date;

  @ApiProperty({ required: false })
  endDate?: Date;

  @ApiProperty()
  personId: number;

  person?: Person;

  @ApiProperty()
  companyId: number;

  company?: Company;

  @ApiProperty()
  categoryId: number;

  category?: EmployeeCategory;

  @ApiProperty()
  positionId: number;

  position?: EmployeePosition;

  @ApiProperty({ required: false })
  createdAt?: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}
