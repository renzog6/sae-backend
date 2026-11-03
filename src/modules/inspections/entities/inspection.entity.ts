import { ApiProperty } from "@nestjs/swagger";
import { Inspection as PrismaInspection } from "@prisma/client";
import { Equipment } from "@modules/equipment/entities/equipment.entity";
import { Employee } from "@modules/employees/entities/employee.entity";

export class Inspection implements Partial<PrismaInspection> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    date: Date;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false })
    observation?: string;

    @ApiProperty()
    equipmentId: number;

    equipment?: Equipment;

    @ApiProperty()
    employeeId: number;

    employee?: Employee;

    @ApiProperty()
    inspectionTypeId: number;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
