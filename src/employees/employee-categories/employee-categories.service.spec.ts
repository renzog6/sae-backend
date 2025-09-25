import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeCategoriesService } from './employee-categories.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('EmployeeCategoriesService', () => {
  let service: EmployeeCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeCategoriesService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<EmployeeCategoriesService>(EmployeeCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
