import { InputType, Field, Int, Float } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsInt, MaxLength, IsOptional, IsBoolean, IsNumber } from "class-validator";

@InputType()
export class CreateAddressInput {
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    @MaxLength(150)
    street?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    @MaxLength(10)
    number?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    @MaxLength(10)
    floor?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    @MaxLength(10)
    apartment?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    neighborhood?: string;

    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    @MaxLength(255)
    reference?: string;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber()
    latitude?: number;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber()
    longitude?: number;

    @Field({ nullable: true, defaultValue: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean = true;

    @Field(() => Int)
    @IsInt()
    @IsNotEmpty()
    cityId: number;

    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    personId?: number;

    @Field(() => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    companyId?: number;
}

@InputType()
export class UpdateAddressInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(150)
    street?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(10)
    number?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(10)
    floor?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(10)
    apartment?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    neighborhood?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    reference?: string;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber()
    latitude?: number;

    @Field(() => Float, { nullable: true })
    @IsOptional()
    @IsNumber()
    longitude?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    cityId?: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    personId?: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    companyId?: number;
}
