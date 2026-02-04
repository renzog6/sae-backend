import { ObjectType, Field, Int, registerEnumType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { EmployeeVacation as PrismaEmployeeVacation, VacationType } from "@prisma/client";
import { Employee } from "../../entities/employee.entity";

registerEnumType(VacationType, {
    name: "VacationType",
});

@ObjectType()
export class EmployeeVacation implements Partial<PrismaEmployeeVacation> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field(() => Int)
    @ApiProperty()
    days: number;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    year?: number;

    @Field(() => Date)
    @ApiProperty()
    startDate: Date;

    @Field(() => Date)
    @ApiProperty()
    endDate: Date;

    @Field(() => VacationType)
    @ApiProperty({ enum: VacationType })
    type: VacationType;

    @Field(() => Employee, { nullable: true })
    employee?: Employee;
}
