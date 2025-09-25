// file: sae-backend/src/locations/cities/cities.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('CitiesService', () => {
  let service: CitiesService;
  const prismaMock: Partial<PrismaService> = {
    city: {
      findMany: jest.fn().mockResolvedValue([{ id: 1 }]),
      findUnique: jest.fn().mockResolvedValue({ id: 1 }),
      create: jest.fn().mockResolvedValue({ id: 2 }),
      update: jest.fn().mockResolvedValue({ id: 1, name: 'U' }),
      delete: jest.fn().mockResolvedValue({ id: 1 }),
      findFirst: jest.fn().mockResolvedValue({ id: 7, postalCode: 'AB' }),
    },
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesService, { provide: PrismaService, useValue: prismaMock }],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
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
    const data = await service.create({ name: 'X', postalCode: 'Y', provinceId: 1 } as any);
    expect(data.id).toBe(2);
  });

  it('update should return updated', async () => {
    const data = await service.update(1, { name: 'U' } as any);
    expect(data.name).toBe('U');
  });

  it('remove should return deleted', async () => {
    const data = await service.remove(1);
    expect(data.id).toBe(1);
  });

  it('findByProvince should return list', async () => {
    const data = await service.findByProvince(9);
    expect(Array.isArray(data)).toBe(true);
  });

  it('findByPostalCode should return a record', async () => {
    const data = await service.findByPostalCode('AB');
    expect(data?.postalCode).toBe('AB');
  });
});
