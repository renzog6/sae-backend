// filepath: sae-backend/src/server-files/strategies/employee/employee-file.strategy.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { StorageStrategy } from '../storage-strategy.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeFileStrategy implements StorageStrategy {
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
        const employee = await this.prisma.employee.findUnique({
            where: { id: entityId },
            include: { person: true },
        });

        if (!employee || !employee.person) {
            throw new NotFoundException(`Employee with ID ${entityId} not found`);
        }

        const lastName = this.slugify(employee.person.lastName || 'sin_apellido');
        const firstName = this.slugify(employee.person.firstName || 'sin_nombre');
        const dni = this.slugify(employee.person.dni || 'sin_dni');

        return `employees/${lastName}_${firstName}_${dni}`;
    }

    getPrismaRelation(entityId: number): object {
        return { employeeId: entityId };
    }

    validateFile(file: any): void {
        // Implement specific validation if needed (e.g. max size, allowed types)
        // For now, we rely on the controller's global validation or basic checks
    }

    async onUploadComplete(fileId: number, entityId: number): Promise<void> {
        // Hook for future use, e.g. linking profile picture
    }
}
