import { Test, TestingModule } from '@nestjs/testing';
import { PersonsService } from './persons.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PersonsService', () => {
  let service: PersonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonsService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<PersonsService>(PersonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
