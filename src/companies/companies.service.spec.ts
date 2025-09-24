// filepath: sae-backend/src/companies/companies.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { PrismaService } from '../prisma/prisma.service';
// Avoid importing generic PaginatedResponseDto to prevent type parameter issues in tests

const prismaMock = {
  company: {
    create: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  address: {
    update: jest.fn(),
    create: jest.fn(),
  },
} as unknown as jest.Mocked<PrismaService>;

describe('CompaniesService', () => {
  let service: CompaniesService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('creates a company without address', async () => {
      const payload = { cuit: '30-123', name: 'ACME', businessName: null, information: null, businessCategoryId: 1 } as any;
      const created = { id: 1, ...payload, addresses: [], businessCategory: { id: 1 } };
      (prismaMock.company.create as any).mockResolvedValue(created);

      const res = await service.create(payload);
      expect(prismaMock.company.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ cuit: '30-123', name: 'ACME' }),
        include: { addresses: true, businessCategory: true },
      });
      expect(res).toEqual(created);
    });

    it('creates a company with address', async () => {
      const payload = { cuit: '30-123', name: 'ACME', address: { street: 'S', number: '1', cityId: 10 } } as any;
      const created = { id: 1, ...payload, addresses: [{ id: 1 }], businessCategory: null };
      (prismaMock.company.create as any).mockResolvedValue(created);

      const res = await service.create(payload);
      expect(prismaMock.company.create).toHaveBeenCalled();
      expect(res).toEqual(created);
    });
  });

  describe('findAll', () => {
    it('returns paginated companies', async () => {
      (prismaMock.company.findMany as any).mockResolvedValue([{ id: 1 }]);
      (prismaMock.company.count as any).mockResolvedValue(1);

      const res = await service.findAll({ page: 1, limit: 10, skip: 0 } as any);
      expect(typeof res).toBe('object');
      expect((res as any).meta.total).toBe(1);
      expect(Array.isArray((res as any).data)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('returns a company when found', async () => {
      (prismaMock.company.findUnique as any).mockResolvedValue({ id: 1 });
      const res = await service.findOne('1');
      expect(res).toEqual({ id: 1 });
    });

    it('throws NotFoundException when not found', async () => {
      (prismaMock.company.findUnique as any).mockResolvedValue(null);
      await expect(service.findOne('99')).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('update', () => {
    it('updates company basic fields and upserts address (create)', async () => {
      (prismaMock.company.findUnique as any).mockResolvedValue({ id: 1 });
      (prismaMock.company.update as any).mockResolvedValue({ id: 1 });
      (prismaMock.address.create as any).mockResolvedValue({ id: 2 });

      const payload = { name: 'New', address: { street: 'S', number: '1', cityId: 10 } } as any;
      const res = await service.update('1', payload);

      expect(prismaMock.company.update).toHaveBeenCalled();
      expect(prismaMock.address.create).toHaveBeenCalled();
      expect(res).toEqual({ id: 1 });
    });

    it('updates address when id provided', async () => {
      (prismaMock.company.findUnique as any).mockResolvedValue({ id: 1 });
      (prismaMock.company.update as any).mockResolvedValue({ id: 1 });
      (prismaMock.address.update as any).mockResolvedValue({ id: 2 });

      const payload = { address: { id: 2, street: 'S', number: '1', cityId: 10 } } as any;
      await service.update('1', payload);
      expect(prismaMock.address.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('deletes company after ensure exists', async () => {
      (prismaMock.company.findUnique as any).mockResolvedValue({ id: 1 });
      (prismaMock.company.delete as any).mockResolvedValue({});
      const res = await service.remove('1');
      expect(prismaMock.company.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res).toEqual({ id: '1' });
    });
  });
});
