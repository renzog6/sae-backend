import { InputType, Field, Int } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsInt, MaxLength, IsOptional } from "class-validator";

@InputType()
export class CreateCityInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    postalCode: string;

    @Field(() => Int)
    @IsInt()
    @IsNotEmpty()
    provinceId: number;
}

@InputType()
export class UpdateCityInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    name?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(20)
    postalCode?: string;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    provinceId?: number;
}
