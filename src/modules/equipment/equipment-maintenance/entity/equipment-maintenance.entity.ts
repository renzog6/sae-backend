import { ApiProperty } from "@nestjs/swagger";
import { EquipmentMaintenance as PrismaEquipmentMaintenance, MaintenanceType } from "@prisma/client";

export class EquipmentMaintenance implements Partial<PrismaEquipmentMaintenance> {
    @ApiProperty()
    id: number;

    @ApiProperty({ enum: MaintenanceType })
    type: MaintenanceType;

    @ApiProperty()
    description: string;

    @ApiProperty({ required: false })
    cost?: any; // Prisma Decimal, uses string or number or Decimal

    @ApiProperty()
    startDate: Date;

    @ApiProperty({ required: false })
    endDate?: Date;

    @ApiProperty({ required: false })
    technician?: string;

    @ApiProperty()
    equipmentId: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}