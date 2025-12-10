// filepath: sae-backend/src/server-files/controllers/server-files.controller.ts
import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    UploadedFile,
    UseInterceptors,
    Res,
    NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join, isAbsolute } from 'path';
import { Response } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { ServerFilesService } from '../services/server-files.service';
import { StorageFactory } from '../factory/storage.factory';
import { UploadFileDto } from '../dto/upload-file.dto';

const TEMP_UPLOAD_DIR = join(process.cwd(), 'storage', 'uploads', 'temp');

// Ensure temp directory exists
if (!existsSync(TEMP_UPLOAD_DIR)) {
    try {
        mkdirSync(TEMP_UPLOAD_DIR, { recursive: true });
    } catch { }
}

@ApiTags('server-files')
@Controller('server-files')
export class ServerFilesController {
    constructor(
        private readonly serverFilesService: ServerFilesService,
        private readonly storageFactory: StorageFactory,
    ) { }

    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload a file associated with an entity',
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
                entityType: { type: 'string', enum: ['EMPLOYEE', 'COMPANY'] },
                entityId: { type: 'integer' },
                description: { type: 'string' },
            },
            required: ['file', 'entityType', 'entityId'],
        },
    })
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: TEMP_UPLOAD_DIR,
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, uniqueSuffix + extname(file.originalname));
                },
            }),
            limits: {
                fileSize: 10 * 1024 * 1024, // 10MB limit
            },
        }),
    )
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: UploadFileDto,
    ) {
        const strategy = this.storageFactory.getStrategy(body.entityType);
        return this.serverFilesService.upload(
            file,
            body.entityId,
            strategy,
            body.description,
        );
    }

    @Get(':id/download')
    async download(@Param('id') id: string, @Res() res: Response) {
        const doc = await this.serverFilesService.findOne(+id);
        const filePath = isAbsolute(doc.data.path)
            ? doc.data.path
            : join(process.cwd(), doc.data.path);

        if (!existsSync(filePath)) {
            throw new NotFoundException('File not found');
        }

        return res.download(filePath, doc.data.filename);
    }
}
