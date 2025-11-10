// filepath: sae-backend/src/modules/locations/countries/countries.controller.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { CountriesController } from "./countries.controller";
import { CountriesService } from "./countries.service";
import { CreateCountryDto } from "./dto/create-country.dto";

describe("CountriesController", () => {
  let controller: CountriesController;
  let service: CountriesService;

  const mockService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: "AR", code: "AR" }]),
    findOne: jest.fn().mockResolvedValue({ id: 1, name: "AR", code: "AR" }),
    create: jest.fn().mockResolvedValue({ id: 2, name: "UY", code: "UY" }),
    update: jest.fn().mockResolvedValue({ id: 1, name: "ARG", code: "AR" }),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
    findProvinces: jest
      .fn()
      .mockResolvedValue([{ id: 10, name: "Buenos Aires", countryId: 1 }]),
  } as unknown as CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [{ provide: CountriesService, useValue: mockService }],
    }).compile();

    controller = module.get<CountriesController>(CountriesController);
    service = module.get<CountriesService>(CountriesService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("GET /locations/countries -> { data: [] }", async () => {
    const res = await controller.findAll();
    expect(res).toEqual({ data: [{ id: 1, name: "AR", code: "AR" }] });
  });

  it("GET /locations/countries/:id -> { data: {...} }", async () => {
    const res = await controller.findOne("1");
    expect(res).toEqual({ data: { id: 1, name: "AR", code: "AR" } });
  });

  it("POST /locations/countries -> { data: { id } }", async () => {
    const dto: CreateCountryDto = { name: "UY", code: "UY" };
    const res = await controller.create(dto);
    expect(res).toEqual({ data: { id: 2, name: "UY", code: "UY" } });
  });

  it("PATCH /locations/countries/:id -> { data: {...} }", async () => {
    const res = await controller.update("1", { name: "ARG" } as any);
    expect(res).toEqual({ data: { id: 1, name: "ARG", code: "AR" } });
  });

  it("DELETE /locations/countries/:id -> { data: {...} }", async () => {
    const res = await controller.remove("1");
    expect(res).toEqual({ data: { id: 1 } });
  });

  it("GET /locations/countries/:id/provinces -> { data: [] }", async () => {
    const res = await controller.provinces("1");
    expect(res).toEqual({
      data: [{ id: 10, name: "Buenos Aires", countryId: 1 }],
    });
  });
});
