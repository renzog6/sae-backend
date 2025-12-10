// filepath: sae-backend/src/server-files/strategies/company/company-file.strategy.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { StorageStrategy } from '../storage-strategy.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyFileStrategy implements StorageStrategy {
    constructor(private readonly prisma: PrismaService) { }

    private slugify(input: string): string {
        return input
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .replace(/[^a-zA-Z0-9]+/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_+|_+$/g, '')
            .toLowerCase();
    }

    async getDestinationPath(entityId: number): Promise<string> {
        const company = await this.prisma.company.findUnique({
            where: { id: entityId },
        });

        if (!company) {
            throw new NotFoundException(`Company with ID ${entityId} not found`);
        }

        const name = this.slugify(company.name || 'sin_nombre');
        const cuit = this.slugify(company.cuit || 'sin_cuit');

        return `companies/${name}_${cuit}`;
    }

    getPrismaRelation(entityId: number): object {
        return { companyId: entityId };
    }

    validateFile(file: any): void {
        // Implement specific validation if needed
    }

    async onUploadComplete(fileId: number, entityId: number): Promise<void> {
        // Hook for future use
    }
}
