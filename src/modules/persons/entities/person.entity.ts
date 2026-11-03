import { ApiProperty } from "@nestjs/swagger";
import { Person as PrismaPerson, Gender, MaritalStatus, PersonStatus } from "@prisma/client";
import { Contact } from "@modules/contacts/entities/contact.entity";

export class Person implements Partial<PrismaPerson> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    dni: string;

    @ApiProperty({ required: false })
    cuil?: string;

    @ApiProperty({ required: false })
    birthDate?: Date;

    @ApiProperty({ enum: Gender, required: false })
    gender?: Gender;

    @ApiProperty({ enum: MaritalStatus, required: false })
    maritalStatus?: MaritalStatus;

    @ApiProperty({ required: false })
    information?: string;

    @ApiProperty({ enum: PersonStatus })
    status: PersonStatus;

    contacts?: Contact[];
}
