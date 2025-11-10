// filepath: sae-backend/src/modules/locations/addresses/addresses.controller.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { AddressesController } from "./addresses.controller";
import { AddressesService } from "./addresses.service";
import { CreateAddressDto } from "./dto/create-address.dto";

describe("AddressesController", () => {
  let controller: AddressesController;
  let service: AddressesService;

  const mockService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1 }]),
    findOne: jest.fn().mockResolvedValue({ id: 1 }),
    create: jest.fn().mockResolvedValue({ id: 2 }),
    update: jest.fn().mockResolvedValue({ id: 1, cityId: 9 }),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
    findByCity: jest.fn().mockResolvedValue([{ id: 1, cityId: 9 }]),
    findByCompany: jest.fn().mockResolvedValue([{ id: 1, companyId: 3 }]),
  } as unknown as AddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [{ provide: AddressesService, useValue: mockService }],
    }).compile();

    controller = module.get<AddressesController>(AddressesController);
    service = module.get<AddressesService>(AddressesService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("GET /locations/addresses -> { data: [] }", async () => {
    const res = await controller.findAll();
    expect(res).toEqual({ data: [{ id: 1 }] });
    expect(service.findAll).toHaveBeenCalled();
  });

  it("GET /locations/addresses/:id -> { data: { ... } }", async () => {
    const res = await controller.findOne("1");
    expect(res).toEqual({ data: { id: 1 } });
  });

  it("POST /locations/addresses -> { data: { id } }", async () => {
    const dto: CreateAddressDto = { cityId: 1 } as any;
    const res = await controller.create(dto);
    expect(res).toEqual({ data: { id: 2 } });
  });

  it("PATCH /locations/addresses/:id -> { data: { ... } }", async () => {
    const res = await controller.update("1", { cityId: 9 } as any);
    expect(res).toEqual({ data: { id: 1, cityId: 9 } });
  });

  it("DELETE /locations/addresses/:id -> { data: { id } }", async () => {
    const res = await controller.remove("1");
    expect(res).toEqual({ data: { id: 1 } });
  });

  it("GET /locations/addresses/city/:cityId -> { data: [] }", async () => {
    const res = await controller.byCity("9");
    expect(res).toEqual({ data: [{ id: 1, cityId: 9 }] });
  });

  it("GET /locations/addresses/company/:companyId -> { data: [] }", async () => {
    const res = await controller.byCompany("3");
    expect(res).toEqual({ data: [{ id: 1, companyId: 3 }] });
  });
});
