import { IsString, IsNotEmpty, IsInt, MaxLength, IsOptional, IsBoolean, IsNumber } from "class-validator";

export class CreateAddressInput {
    @IsString()
    @IsOptional()
    @MaxLength(150)
    street?: string;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    number?: string;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    floor?: string;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    apartment?: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    neighborhood?: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    reference?: string;

    @IsOptional()
    @IsNumber()
    latitude?: number;

    @IsOptional()
    @IsNumber()
    longitude?: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean = true;

    @IsInt()
    @IsNotEmpty()
    cityId: number;

    @IsInt()
    @IsOptional()
    personId?: number;

    @IsInt()
    @IsOptional()
    companyId?: number;
}

export class UpdateAddressInput {
    @IsOptional()
    @IsString()
    @MaxLength(150)
    street?: string;

    @IsOptional()
    @IsString()
    @MaxLength(10)
    number?: string;

    @IsOptional()
    @IsString()
    @MaxLength(10)
    floor?: string;

    @IsOptional()
    @IsString()
    @MaxLength(10)
    apartment?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    neighborhood?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    reference?: string;

    @IsOptional()
    @IsNumber()
    latitude?: number;

    @IsOptional()
    @IsNumber()
    longitude?: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsInt()
    cityId?: number;

    @IsOptional()
    @IsInt()
    personId?: number;

    @IsOptional()
    @IsInt()
    companyId?: number;
}
