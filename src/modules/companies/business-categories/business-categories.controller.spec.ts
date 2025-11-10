// filepath: sae-backend/src/modules/companies/business-categories/business-categories.controller.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { BusinessCategoriesController } from "./business-categories.controller";
import { BusinessCategoriesService } from "./business-categories.service";

const serviceMock = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe("BusinessCategoriesController", () => {
  let controller: BusinessCategoriesController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessCategoriesController],
      providers: [
        { provide: BusinessCategoriesService, useValue: serviceMock },
      ],
    }).compile();

    controller = module.get<BusinessCategoriesController>(
      BusinessCategoriesController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("findAll delegates to service", async () => {
    (serviceMock.findAll as any).mockResolvedValue([]);
    const res = await controller.findAll();
    expect(serviceMock.findAll).toHaveBeenCalled();
    expect(res).toEqual([]);
  });

  it("findOne delegates to service", async () => {
    (serviceMock.findOne as any).mockResolvedValue({ id: 1 });
    const res = await controller.findOne("1");
    expect(serviceMock.findOne).toHaveBeenCalledWith(1);
    expect(res).toEqual({ id: 1 });
  });

  it("create delegates to service", async () => {
    (serviceMock.create as any).mockResolvedValue({ id: 1 });
    const res = await controller.create({ name: "Cat" } as any);
    expect(serviceMock.create).toHaveBeenCalled();
    expect(res).toEqual({ id: 1 });
  });

  it("update delegates to service", async () => {
    (serviceMock.update as any).mockResolvedValue({ id: 1 });
    const res = await controller.update("1", { name: "New" } as any);
    expect(serviceMock.update).toHaveBeenCalledWith(1, { name: "New" });
    expect(res).toEqual({ id: 1 });
  });

  it("remove delegates to service", async () => {
    (serviceMock.remove as any).mockResolvedValue({ id: 1 });
    const res = await controller.remove("1");
    expect(serviceMock.remove).toHaveBeenCalledWith(1);
    expect(res).toEqual({ id: 1 });
  });
});
