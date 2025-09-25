// file: sae-backend/src/locations/addresses/addresses.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AddressesService } from './addresses.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('AddressesService', () => {
  let service: AddressesService;
  const prismaMock: Partial<PrismaService> = {
    address: {
      findMany: jest.fn().mockResolvedValue([{ id: 1 }]),
      findUnique: jest.fn().mockResolvedValue({ id: 1 }),
      create: jest.fn().mockResolvedValue({ id: 2 }),
      update: jest.fn().mockResolvedValue({ id: 1, cityId: 9 }),
      delete: jest.fn().mockResolvedValue({ id: 1 }),
    },
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressesService, { provide: PrismaService, useValue: prismaMock }],
    }).compile();

    service = module.get<AddressesService>(AddressesService);
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
    const data = await service.create({ cityId: 1 } as any);
    expect(data.id).toBe(2);
  });

  it('update should return updated', async () => {
    const data = await service.update(1, { cityId: 9 } as any);
    expect(data.cityId).toBe(9);
  });

  it('remove should return deleted', async () => {
    const data = await service.remove(1);
    expect(data.id).toBe(1);
  });
});
