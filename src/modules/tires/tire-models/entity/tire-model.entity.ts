import { ApiProperty } from "@nestjs/swagger";
import { TireModel as PrismaTireModel } from "@prisma/client";
import { Brand } from "@modules/catalogs/brands/entities/brand.entity";
import { TireSize } from "../../tire-sizes/entity/tire-size.entity";

export class TireModel implements Partial<PrismaTireModel> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    brandId: number;

    brand?: Brand;

    @ApiProperty()
    sizeId: number;

    size?: TireSize;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    construction?: string;

    @ApiProperty({ required: false })
    loadIndex?: number;

    @ApiProperty({ required: false })
    speedSymbol?: string;

    @ApiProperty({ required: false })
    plyRating?: string;

    @ApiProperty({ required: false })
    treadPattern?: string;

    @ApiProperty({ required: false })
    information?: string;
}
