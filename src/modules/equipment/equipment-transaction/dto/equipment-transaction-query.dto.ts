import { BaseQueryDto } from "@common/dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { EquipmentTransactionType } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";

export class EquipmentTransactionQueryDto extends BaseQueryDto {
    @ApiPropertyOptional({ enum: EquipmentTransactionType })
    @IsOptional()
    @IsEnum(EquipmentTransactionType)
    type?: EquipmentTransactionType;
}
