import { ApiProperty } from "@nestjs/swagger";
import { EmployeeVacation as PrismaEmployeeVacation, VacationType } from "@prisma/client";
import { Employee } from "../../entities/employee.entity";

export class EmployeeVacation implements Partial<PrismaEmployeeVacation> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    days: number;

    @ApiProperty({ required: false })
    year?: number;

    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    endDate: Date;

    @ApiProperty({ enum: VacationType })
    type: VacationType;

    employee?: Employee;
}
