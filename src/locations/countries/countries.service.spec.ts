// file: sae-backend/src/locations/countries/countries.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CountriesService } from './countries.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('CountriesService', () => {
  let service: CountriesService;
  const prismaMock: Partial<PrismaService> = {
    country: {
      findMany: jest.fn().mockResolvedValue([{ id: 1 }]),
      findUnique: jest.fn().mockResolvedValue({ id: 1 }),
      create: jest.fn().mockResolvedValue({ id: 2 }),
      update: jest.fn().mockResolvedValue({ id: 1, name: 'ARG' }),
      delete: jest.fn().mockResolvedValue({ id: 1 }),
    },
    province: {
      findMany: jest.fn().mockResolvedValue([{ id: 10, countryId: 1 }]),
    },
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountriesService, { provide: PrismaService, useValue: prismaMock }],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return list', async () => {
    const data = await service.findAll();
    expect(Array.isArray(data)).toBe(true);
  });

  it('findOne should return a record', async () => {
    const data = await service.findOne(1);
    expect(data.id).toBe(1);
  });

  it('create should return created', async () => {
    const data = await service.create({ name: 'UY', code: 'UY' } as any);
    expect(data.id).toBe(2);
  });

  it('update should return updated', async () => {
    const data = await service.update(1, { name: 'ARG' } as any);
    expect(data.name).toBe('ARG');
  });

  it('remove should return deleted', async () => {
    const data = await service.remove(1);
    expect(data.id).toBe(1);
  });

  it('findProvinces should return list', async () => {
    const data = await service.findProvinces(1);
    expect(Array.isArray(data)).toBe(true);
  });
});
