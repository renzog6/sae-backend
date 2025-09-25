import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeVacationsService } from './employee-vacations.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('EmployeeVacationsService', () => {
  let service: EmployeeVacationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeVacationsService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<EmployeeVacationsService>(EmployeeVacationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
