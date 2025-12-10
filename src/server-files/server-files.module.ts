// filepath: sae-backend/src/server-files/server-files.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ServerFilesController } from './controllers/server-files.controller';
import { ServerFilesService } from './services/server-files.service';
import { StorageFactory } from './factory/storage.factory';
import { EmployeeFileStrategy } from './strategies/employee/employee-file.strategy';
import { CompanyFileStrategy } from './strategies/company/company-file.strategy';

@Module({
    imports: [PrismaModule],
    controllers: [ServerFilesController],
    providers: [
        ServerFilesService,
        StorageFactory,
        EmployeeFileStrategy,
        CompanyFileStrategy,
    ],
    exports: [ServerFilesService],
})
export class ServerFilesModule { }
