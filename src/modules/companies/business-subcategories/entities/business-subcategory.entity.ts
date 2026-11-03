import { ApiProperty } from "@nestjs/swagger";
import { BusinessSubCategory as PrismaBusinessSubCategory } from "@prisma/client";

export class BusinessSubCategory implements Partial<PrismaBusinessSubCategory> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty()
    businessCategoryId: number;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
