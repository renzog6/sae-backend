import { ApiProperty } from "@nestjs/swagger";
import { City as PrismaCity } from "@prisma/client";
import { Province } from "../../provinces/entities/province.entity";
import { Address } from "../../addresses/entities/address.entity";

export class City implements Partial<PrismaCity> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    postalCode: string;

    province?: Province;

    addresses?: Address[];
}
