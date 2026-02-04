import { ObjectType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Inspection as PrismaInspection } from "@prisma/client";
import { Equipment } from "@modules/equipment/entities/equipment.entity";
import { Employee } from "@modules/employees/entities/employee.entity";

@ObjectType()
export class Inspection implements Partial<PrismaInspection> {
    @Field(() => Int)
    @ApiProperty()
    id: number;

    @Field()
    @ApiProperty()
    date: Date;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    description?: string;

    @Field({ nullable: true })
    @ApiProperty({ required: false })
    observation?: string;

    @Field(() => Int)
    @ApiProperty()
    equipmentId: number;

    @Field(() => Equipment, { nullable: true })
    equipment?: Equipment;

    @Field(() => Int)
    @ApiProperty()
    employeeId: number;

    @Field(() => Employee, { nullable: true })
    employee?: Employee;

    @Field(() => Int)
    @ApiProperty()
    inspectionTypeId: number;

    @Field()
    @ApiProperty()
    isActive: boolean;

    @Field()
    @ApiProperty()
    createdAt: Date;

    @Field()
    @ApiProperty()
    updatedAt: Date;
}
