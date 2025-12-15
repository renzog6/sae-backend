import { ApiProperty } from "@nestjs/swagger";
import { HistoryLog as PrismaHistoryLog, HistoryType, SeverityLevel } from "@prisma/client";

export class HistoryLog implements Partial<PrismaHistoryLog> {
    @ApiProperty()
    id: number;

    @ApiProperty({ enum: HistoryType })
    type: HistoryType;

    @ApiProperty({ enum: SeverityLevel })
    severity: SeverityLevel;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ required: false })
    metadata?: string;

    @ApiProperty()
    eventDate: Date;

    @ApiProperty({ required: false })
    ipAddress?: string;

    @ApiProperty({ required: false })
    userAgent?: string;

    @ApiProperty({ required: false })
    companyId?: number;

    @ApiProperty({ required: false })
    personId?: number;

    @ApiProperty({ required: false })
    employeeId?: number;

    @ApiProperty({ required: false })
    equipmentId?: number;

    @ApiProperty({ required: false })
    userId?: number;

    @ApiProperty()
    createdAt: Date;
}
