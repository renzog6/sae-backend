import { IsString, IsNotEmpty, IsInt, MaxLength, IsOptional } from "class-validator";

export class CreateCityInput {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    postalCode: string;

    @IsInt()
    @IsNotEmpty()
    provinceId: number;
}

export class UpdateCityInput {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    postalCode?: string;

    @IsOptional()
    @IsInt()
    provinceId?: number;
}
