import { ApiProperty } from "@nestjs/swagger";
import { Contact as PrismaContact, ContactType } from "@prisma/client";

export class Contact implements Partial<PrismaContact> {
    @ApiProperty()
    id: number;

    @ApiProperty({ enum: ContactType })
    type: ContactType;

    @ApiProperty()
    value: string;

    @ApiProperty({ required: false })
    label?: string;

    @ApiProperty({ required: false })
    information?: string;
}
