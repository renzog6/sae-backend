// filepath: sae-backend/src/companies/companies.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

const serviceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('CompaniesController', () => {
  let controller: CompaniesController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [{ provide: CompaniesService, useValue: serviceMock }],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create delegates to service', async () => {
    (serviceMock.create as any).mockResolvedValue({ id: 1 });
    const res = await controller.create({ name: 'ACME' } as any);
    expect(serviceMock.create).toHaveBeenCalled();
    expect(res).toEqual({ id: 1 });
  });

  it('findAll delegates to service', async () => {
    (serviceMock.findAll as any).mockResolvedValue({ data: [], total: 0 });
    const res = await controller.findAll({ page: 1, limit: 10 } as any);
    expect(serviceMock.findAll).toHaveBeenCalled();
    expect(res).toEqual({ data: [], total: 0 });
  });

  it('findOne delegates to service', async () => {
    (serviceMock.findOne as any).mockResolvedValue({ id: 1 });
    const res = await controller.findOne('1');
    expect(serviceMock.findOne).toHaveBeenCalledWith('1');
    expect(res).toEqual({ id: 1 });
  });

  it('update delegates to service', async () => {
    (serviceMock.update as any).mockResolvedValue({ id: 1 });
    const res = await controller.update('1', { name: 'New' } as any);
    expect(serviceMock.update).toHaveBeenCalledWith('1', { name: 'New' });
    expect(res).toEqual({ id: 1 });
  });

  it('remove delegates to service', async () => {
    (serviceMock.remove as any).mockResolvedValue({ id: '1' });
    const res = await controller.remove('1');
    expect(serviceMock.remove).toHaveBeenCalledWith('1');
    expect(res).toEqual({ id: '1' });
  });
});
