import { ApiProperty } from "@nestjs/swagger";
import { Company as PrismaCompany } from "@prisma/client";
import { BusinessCategory } from "../business-categories/entities/business-category.entity";
import { Contact } from "@modules/contacts/entities/contact.entity";

export class Company implements Partial<PrismaCompany> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    cuit: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    businessName?: string;

    @ApiProperty({ required: false })
    information?: string;

    @ApiProperty({ required: false })
    businessCategoryId?: number;

    businessCategory?: BusinessCategory;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    contacts?: Contact[];
}
