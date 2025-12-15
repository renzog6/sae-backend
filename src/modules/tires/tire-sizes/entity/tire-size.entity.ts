import { ApiProperty } from "@nestjs/swagger";
import { TireSize as PrismaTireSize } from "@prisma/client";

export class TireSize implements Partial<PrismaTireSize> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    mainCode: string;

    @ApiProperty({ required: false })
    width?: number;

    @ApiProperty({ required: false })
    aspectRatio?: number;

    @ApiProperty({ required: false })
    rimDiameter?: any; // Decimal in Prisma

    @ApiProperty({ required: false })
    information?: string;
}
