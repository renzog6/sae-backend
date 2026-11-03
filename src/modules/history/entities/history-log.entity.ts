import { ApiProperty } from "@nestjs/swagger";
import { HistoryLog as PrismaHistoryLog, HistoryType, SeverityLevel } from "@prisma/client";
import { Employee } from "@modules/employees/entities/employee.entity";
import { Company } from "@modules/companies/entities/company.entity";
import { Equipment } from "@modules/equipment/entities/equipment.entity";
import { Person } from "@modules/persons/entities/person.entity";

export class HistoryLog implements Partial<PrismaHistoryLog> {
    @ApiProperty()
    id: number;

    @ApiProperty({ enum: HistoryType })
    type: HistoryType;

    @ApiProperty({ enum: SeverityLevel })
    severity: SeverityLevel;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ required: false })
    metadata?: string;

    @ApiProperty()
    eventDate: Date;

    @ApiProperty({ required: false })
    companyId?: number;

    company?: Company;

    @ApiProperty({ required: false })
    personId?: number;

    person?: Person;

    @ApiProperty({ required: false })
    employeeId?: number;

    employee?: Employee;

    @ApiProperty({ required: false })
    equipmentId?: number;

    equipment?: Equipment;

    @ApiProperty({ required: false })
    userId?: number;

    @ApiProperty()
    createdAt: Date;
}
