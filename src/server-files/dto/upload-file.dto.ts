// filepath: sae-backend/src/server-files/dto/upload-file.dto.ts
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ServerFileType } from './server-file-type.enum';

export class UploadFileDto {
    @ApiProperty({ enum: ServerFileType })
    @IsEnum(ServerFileType)
    entityType: ServerFileType;

    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    entityId: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;
}
