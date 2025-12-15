import { ApiProperty } from "@nestjs/swagger";
import { Employee as PrismaEmployee, EmployeeStatus } from "@prisma/client";

export class Employee implements Partial<PrismaEmployee> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    employeeCode: string;

    @ApiProperty()
    hireDate: Date;

    @ApiProperty({ enum: EmployeeStatus })
    status: EmployeeStatus;

    @ApiProperty()
    personId: number;

    @ApiProperty()
    companyId: number;
}
