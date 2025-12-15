import { ApiProperty } from "@nestjs/swagger";
import { EmployeeIncident as PrismaEmployeeIncident, EmployeeIncidentType } from "@prisma/client";

export class EmployeeIncident implements Partial<PrismaEmployeeIncident> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    endDate: Date;

    @ApiProperty({ enum: EmployeeIncidentType })
    type: EmployeeIncidentType;

    @ApiProperty()
    employeeId: number;
}
