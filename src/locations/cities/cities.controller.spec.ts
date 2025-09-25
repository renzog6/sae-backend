// file: sae-backend/src/locations/cities/cities.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';

describe('CitiesController', () => {
  let controller: CitiesController;
  let service: CitiesService;

  const mockService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'City' }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, name: 'City' }),
    create: jest.fn().mockResolvedValue({ id: 2, name: 'New City' }),
    update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated City' }),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
    findByProvince: jest.fn().mockResolvedValue([{ id: 3, provinceId: 9 }]),
    findByPostalCode: jest.fn().mockResolvedValue({ id: 7, postalCode: 'AB' }),
  } as unknown as CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [{ provide: CitiesService, useValue: mockService }],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET /locations/cities -> { data: [] }', async () => {
    const res = await controller.findAll();
    expect(res).toEqual({ data: [{ id: 1, name: 'City' }] });
  });

  it('GET /locations/cities/:id -> { data: {...} }', async () => {
    const res = await controller.findOne('1');
    expect(res).toEqual({ data: { id: 1, name: 'City' } });
  });

  it('POST /locations/cities -> { data: { id } }', async () => {
    const dto: CreateCityDto = { name: 'New City', postalCode: '1000', provinceId: 1 };
    const res = await controller.create(dto);
    expect(res).toEqual({ data: { id: 2, name: 'New City' } });
  });

  it('PATCH /locations/cities/:id -> { data: {...} }', async () => {
    const res = await controller.update('1', { name: 'Updated City' } as any);
    expect(res).toEqual({ data: { id: 1, name: 'Updated City' } });
  });

  it('DELETE /locations/cities/:id -> { data: {...} }', async () => {
    const res = await controller.remove('1');
    expect(res).toEqual({ data: { id: 1 } });
  });

  it('GET /locations/cities/province/:provinceId -> { data: [] }', async () => {
    const res = await controller.byProvince('9');
    expect(res).toEqual({ data: [{ id: 3, provinceId: 9 }] });
  });

  it('GET /locations/cities/postal-code/:postalCode -> { data: {...} }', async () => {
    const res = await controller.byPostalCode('AB');
    expect(res).toEqual({ data: { id: 7, postalCode: 'AB' } });
  });
});
