// filepath: sae-backend/src/server-files/services/server-files.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageStrategy } from '../strategies/storage-strategy.interface';
import { join, basename, relative } from 'path';
import { existsSync, mkdirSync, renameSync, copyFileSync, unlinkSync } from 'fs';

@Injectable()
export class ServerFilesService {
    private readonly BASE_UPLOAD_DIR = join(process.cwd(), 'storage', 'uploads');

    constructor(private readonly prisma: PrismaService) { }

    async upload(
        file: Express.Multer.File,
        entityId: number,
        strategy: StorageStrategy,
        description?: string,
    ) {
        // 1. Validate
        strategy.validateFile(file);

        // 2. Determine destination
        const relativeDestPath = await strategy.getDestinationPath(entityId);
        const fullDestDir = join(this.BASE_UPLOAD_DIR, relativeDestPath);

        // Ensure directory exists
        if (!existsSync(fullDestDir)) {
            mkdirSync(fullDestDir, { recursive: true });
        }

        // 3. Move file
        const filename = basename(file.path); // Assuming Multer generated a unique name
        const fullDestPath = join(fullDestDir, filename);

        try {
            // Try rename first (fastest)
            renameSync(file.path, fullDestPath);
        } catch (error) {
            // Fallback to copy + delete (cross-device)
            try {
                copyFileSync(file.path, fullDestPath);
                unlinkSync(file.path);
            } catch (e) {
                throw new InternalServerErrorException('Failed to move uploaded file');
            }
        }

        // 4. Calculate relative path for DB (storage/uploads/...)
        // We store the path relative to project root or storage root?
        // Previous implementation stored relative to CWD: "src/uploads/..."
        // Let's store "storage/uploads/..."
        const dbPath = relative(process.cwd(), fullDestPath);

        // 5. Create DB Record
        const prismaRelation = strategy.getPrismaRelation(entityId);

        const document = await this.prisma.document.create({
            data: {
                filename: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
                path: dbPath,
                description,
                ...prismaRelation,
            },
        });

        // 6. Post-upload hook
        await strategy.onUploadComplete(document.id, entityId);

        return { data: document };
    }

    async findOne(id: number) {
        const document = await this.prisma.document.findUniqueOrThrow({
            where: { id },
        });
        return { data: document };
    }
}
