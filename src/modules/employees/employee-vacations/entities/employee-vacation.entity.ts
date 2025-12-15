import { ApiProperty } from "@nestjs/swagger";
import { EmployeeVacation as PrismaEmployeeVacation, VacationType } from "@prisma/client";

export class EmployeeVacation implements Partial<PrismaEmployeeVacation> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    days: number;

    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    endDate: Date;

    @ApiProperty({ enum: VacationType })
    type: VacationType;
}
