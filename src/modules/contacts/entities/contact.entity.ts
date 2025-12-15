import { ApiProperty } from "@nestjs/swagger";
import { Contact as PrismaContact } from "@prisma/client";

export class Contact implements Partial<PrismaContact> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    value: string;
}
