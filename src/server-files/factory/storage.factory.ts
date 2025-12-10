// filepath: sae-backend/src/server-files/factory/storage.factory.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { StorageStrategy } from '../strategies/storage-strategy.interface';
import { ServerFileType } from '../dto/server-file-type.enum';
import { EmployeeFileStrategy } from '../strategies/employee/employee-file.strategy';
import { CompanyFileStrategy } from '../strategies/company/company-file.strategy';

@Injectable()
export class StorageFactory {
    private strategies: Map<ServerFileType, StorageStrategy> = new Map();

    constructor(
        private readonly employeeFileStrategy: EmployeeFileStrategy,
        private readonly companyFileStrategy: CompanyFileStrategy,
    ) {
        this.strategies.set(ServerFileType.EMPLOYEE, this.employeeFileStrategy);
        this.strategies.set(ServerFileType.COMPANY, this.companyFileStrategy);
    }

    getStrategy(type: ServerFileType): StorageStrategy {
        const strategy = this.strategies.get(type);
        if (!strategy) {
            throw new BadRequestException(`No storage strategy found for type: ${type}`);
        }
        return strategy;
    }
}
