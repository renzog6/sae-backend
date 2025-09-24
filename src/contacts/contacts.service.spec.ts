// filepath: sae-backend/src/contacts/contacts.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const prismaMock = {
  contact: {
    create: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  contactLink: {
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
} as unknown as jest.Mocked<PrismaService>;

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('creates a contact without links', async () => {
      (prismaMock.contact.create as any).mockResolvedValue({ id: 1, type: 'EMAIL', value: 'a@b.com', contactLinks: [] });
      const res = await service.create({ type: 'EMAIL' as any, value: 'a@b.com' } as any);
      expect(prismaMock.contact.create).toHaveBeenCalled();
      expect(res).toEqual({ id: 1, type: 'EMAIL', value: 'a@b.com', contactLinks: [] });
    });

    it('creates a contact with company link', async () => {
      (prismaMock.contact.create as any).mockResolvedValue({ id: 1, contactLinks: [{ companyId: 10 }] });
      const res = await service.create({ type: 'PHONE' as any, value: '+541112223333', companyId: 10 } as any);
      expect(prismaMock.contact.create).toHaveBeenCalled();
      expect(res).toEqual({ id: 1, contactLinks: [{ companyId: 10 }] });
    });
  });

  describe('findAll', () => {
    it('returns paginated contacts', async () => {
      (prismaMock.contact.findMany as any).mockResolvedValue([{ id: 1 }]);
      (prismaMock.contact.count as any).mockResolvedValue(1);
      const res = await service.findAll({ page: 1, limit: 10, skip: 0 } as any);
      expect((res as any).meta.total).toBe(1);
      expect(Array.isArray((res as any).data)).toBe(true);
    });
  });

  describe('findByCompany', () => {
    it('filters contacts by company id', async () => {
      (prismaMock.contact.findMany as any).mockResolvedValue([{ id: 1 }]);
      (prismaMock.contact.count as any).mockResolvedValue(1);
      const res = await service.findByCompany('10', { page: 1, limit: 10, skip: 0 } as any);
      expect((res as any).meta.total).toBe(1);
      expect(prismaMock.contact.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: expect.any(Object) }));
    });
  });

  describe('findOne', () => {
    it('returns a contact when found', async () => {
      (prismaMock.contact.findUnique as any).mockResolvedValue({ id: 1 });
      const res = await service.findOne('1');
      expect(res).toEqual({ id: 1 });
    });

    it('throws when not found', async () => {
      (prismaMock.contact.findUnique as any).mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('update', () => {
    it('updates core fields and manages links', async () => {
      (prismaMock.contact.findUnique as any).mockResolvedValue({ id: 1 });
      (prismaMock.contact.update as any).mockResolvedValue({ id: 1 });
      (prismaMock.contactLink.deleteMany as any).mockResolvedValue({});
      (prismaMock.contactLink.create as any).mockResolvedValue({});
      (prismaMock.contact.findUnique as any).mockResolvedValue({ id: 1, contactLinks: [] });
      const res = await service.update('1', { type: 'EMAIL' as any, value: 'x@y.com', companyId: 5 } as any);
      expect(prismaMock.contact.update).toHaveBeenCalled();
      expect(prismaMock.contactLink.deleteMany).toHaveBeenCalled();
      expect(prismaMock.contactLink.create).toHaveBeenCalled();
      expect(res).toEqual({ id: 1, contactLinks: [] });
    });
  });

  describe('remove', () => {
    it('deletes links then contact', async () => {
      (prismaMock.contact.findUnique as any).mockResolvedValue({ id: 1 });
      (prismaMock.contactLink.deleteMany as any).mockResolvedValue({});
      (prismaMock.contact.delete as any).mockResolvedValue({});
      const res = await service.remove('1');
      expect(prismaMock.contactLink.deleteMany).toHaveBeenCalledWith({ where: { contactId: 1 } });
      expect(prismaMock.contact.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(res).toEqual({ id: '1' });
    });
  });
});
