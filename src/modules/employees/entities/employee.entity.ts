import { ApiProperty } from "@nestjs/swagger";
import { Employee as PrismaEmployee, EmployeeStatus } from "@prisma/client";
import { ObjectType, Field, Int, registerEnumType } from "@nestjs/graphql";
import { Person } from "@modules/persons/entities/person.entity";
import { EmployeeCategory } from "../employee-categories/entities/employee-category.entity";
import { EmployeePosition } from "../employee-positions/entities/employee-position.entity";
import { Company } from "@modules/companies/entities/company.entity";

// Registrar el enum en GraphQL
registerEnumType(EmployeeStatus, {
    name: 'EmployeeStatus',
});

@ObjectType()
export class Employee implements Partial<PrismaEmployee> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field(() => String)
    @ApiProperty()
    employeeCode: string;

    @Field(() => Date)
    @ApiProperty()
    hireDate: Date;

    @Field(() => EmployeeStatus)
    @ApiProperty({ enum: EmployeeStatus })
    status: EmployeeStatus;

    @Field(() => Int)
    @ApiProperty()
    personId: number;

    @Field(() => Person)
    person: Person;

    @Field(() => Int)
    @ApiProperty()
    companyId: number;

    @Field(() => Company, { nullable: true })
    company?: Company;

    @Field(() => EmployeeCategory, { nullable: true })
    category?: EmployeeCategory;

    @Field(() => EmployeePosition, { nullable: true })
    position?: EmployeePosition;
}
