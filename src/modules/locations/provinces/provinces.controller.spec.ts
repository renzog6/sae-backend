// filepath: sae-backend/src/modules/locations/provinces/provinces.controller.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { ProvincesController } from "./provinces.controller";
import { ProvincesService } from "./provinces.service";
import { CreateProvinceDto } from "./dto/create-province.dto";

describe("ProvincesController", () => {
  let controller: ProvincesController;
  let service: ProvincesService;

  const mockService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: "P" }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, name: "P" }),
    create: jest.fn().mockResolvedValue({ id: 2, name: "NP" }),
    update: jest.fn().mockResolvedValue({ id: 1, name: "UP" }),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
    findByCode: jest.fn().mockResolvedValue({ id: 7, code: "XX" }),
    findByCountry: jest.fn().mockResolvedValue([{ id: 9, countryId: 3 }]),
  } as unknown as ProvincesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvincesController],
      providers: [{ provide: ProvincesService, useValue: mockService }],
    }).compile();

    controller = module.get<ProvincesController>(ProvincesController);
    service = module.get<ProvincesService>(ProvincesService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("GET /locations/provinces -> { data: [] }", async () => {
    const res = await controller.findAll();
    expect(res).toEqual({ data: [{ id: 1, name: "P" }] });
  });

  it("GET /locations/provinces/:id -> { data: {...} }", async () => {
    const res = await controller.findOne("1");
    expect(res).toEqual({ data: { id: 1, name: "P" } });
  });

  it("POST /locations/provinces -> { data: { id } }", async () => {
    const dto: CreateProvinceDto = { name: "NP", code: "NP" };
    const res = await controller.create(dto);
    expect(res).toEqual({ data: { id: 2, name: "NP" } });
  });

  it("PATCH /locations/provinces/:id -> { data: {...} }", async () => {
    const res = await controller.update("1", { name: "UP" } as any);
    expect(res).toEqual({ data: { id: 1, name: "UP" } });
  });

  it("DELETE /locations/provinces/:id -> { data: {...} }", async () => {
    const res = await controller.remove("1");
    expect(res).toEqual({ data: { id: 1 } });
  });

  it("GET /locations/provinces/code/:code -> { data: {...} }", async () => {
    const res = await controller.byCode("XX");
    expect(res).toEqual({ data: { id: 7, code: "XX" } });
  });

  it("GET /locations/provinces/country/:countryId -> { data: [] }", async () => {
    const res = await controller.byCountry("3");
    expect(res).toEqual({ data: [{ id: 9, countryId: 3 }] });
  });
});
