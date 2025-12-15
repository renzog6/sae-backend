import { ApiProperty } from "@nestjs/swagger";
import { Person as PrismaPerson, Gender, MaritalStatus, PersonStatus } from "@prisma/client";

export class Person implements Partial<PrismaPerson> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    dni: string;
}
