import { ApiProperty } from "@nestjs/swagger";
import { BusinessCategory as PrismaBusinessCategory } from "@prisma/client";
import { BusinessSubCategory } from "../../business-subcategories/entities/business-subcategory.entity";

export class BusinessCategory implements Partial<PrismaBusinessCategory> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    code?: string;

    @ApiProperty({ required: false })
    information?: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    subCategories?: BusinessSubCategory[];
}
