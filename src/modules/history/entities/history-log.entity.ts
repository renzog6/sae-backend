import { ObjectType, Field, Int, registerEnumType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { HistoryLog as PrismaHistoryLog, HistoryType, SeverityLevel } from "@prisma/client";
import { Employee } from "@modules/employees/entities/employee.entity";
import { Company } from "@modules/companies/entities/company.entity";
import { Equipment } from "@modules/equipment/entities/equipment.entity";
import { Person } from "@modules/persons/entities/person.entity";

registerEnumType(HistoryType, { name: "HistoryType" });
registerEnumType(SeverityLevel, { name: "SeverityLevel" });

@ObjectType()
export class HistoryLog implements Partial<PrismaHistoryLog> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field(() => HistoryType)
    @ApiProperty({ enum: HistoryType })
    type: HistoryType;

    @Field(() => SeverityLevel)
    @ApiProperty({ enum: SeverityLevel })
    severity: SeverityLevel;

    @Field()
    @ApiProperty()
    title: string;

    @Field({ nullable: true })
    @ApiProperty()
    description: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    metadata?: string;

    @Field()
    @ApiProperty()
    eventDate: Date;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    companyId?: number;

    @Field(() => Company, { nullable: true })
    company?: Company;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    personId?: number;

    @Field(() => Person, { nullable: true })
    person?: Person;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    employeeId?: number;

    @Field(() => Employee, { nullable: true })
    employee?: Employee;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    equipmentId?: number;

    @Field(() => Equipment, { nullable: true })
    equipment?: Equipment;

    @Field(() => Int, { nullable: true })
    @ApiProperty({ required: false })
    userId?: number;

    @Field()
    @ApiProperty()
    createdAt: Date;
}
