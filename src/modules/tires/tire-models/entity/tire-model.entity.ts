import { ApiProperty } from "@nestjs/swagger";
import { TireModel as PrismaTireModel } from "@prisma/client";

export class TireModel implements Partial<PrismaTireModel> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    brandId: number;

    @ApiProperty()
    sizeId: number;

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
