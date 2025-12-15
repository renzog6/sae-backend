import { ApiProperty } from "@nestjs/swagger";
import { Address as PrismaAddress } from "@prisma/client";

export class Address implements Partial<PrismaAddress> {
    @ApiProperty()
    id: number;

    @ApiProperty()
    street: string;

    // Add other properties if needed for Swagger documentation
}
