import { InputType, Field, Int } from "@nestjs/graphql";
import { IsString, IsOptional, IsInt, IsDate } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";

@InputType()
export class CreateInspectionDto {
    @Field(() => Date, { nullable: true })
    @ApiProperty({ default: new Date() })
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    date?: Date;

    @Field({ nullable: true })
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string;

    @Field({ nullable: true })
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    observation?: string;

    @Field(() => Int)
    @ApiProperty()
    @IsInt()
    equipmentId: number;

    @Field(() => Int)
    @ApiProperty()
    @IsInt()
    employeeId: number;

    @Field(() => Int)
    @ApiProperty()
    @IsInt()
    inspectionTypeId: number;
}
