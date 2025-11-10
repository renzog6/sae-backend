// filepath: sae-backend/src/modules/companies/business-subcategories/business-subcategories.controller.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { BusinessSubcategoriesController } from "./business-subcategories.controller";
import { BusinessSubcategoriesService } from "./business-subcategories.service";

const serviceMock = {
  findAll: jest.fn(),
  findAllByCategory: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe("BusinessSubcategoriesController", () => {
  let controller: BusinessSubcategoriesController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessSubcategoriesController],
      providers: [
        { provide: BusinessSubcategoriesService, useValue: serviceMock },
      ],
    }).compile();

    controller = module.get<BusinessSubcategoriesController>(
      BusinessSubcategoriesController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("findAll delegates to service (all)", async () => {
    (serviceMock.findAll as any).mockResolvedValue([{ id: 1 }]);
    const res = await controller.findAll(undefined);
    expect(serviceMock.findAll).toHaveBeenCalled();
    expect(res).toEqual([{ id: 1 }]);
  });

  it("findAll delegates to service (by category)", async () => {
    (serviceMock.findAllByCategory as any).mockResolvedValue([{ id: 1 }]);
    const res = await controller.findAll("10");
    expect(serviceMock.findAllByCategory).toHaveBeenCalledWith(10);
    expect(res).toEqual([{ id: 1 }]);
  });

  it("findOne delegates to service", async () => {
    (serviceMock.findOne as any).mockResolvedValue({ id: 2 });
    const res = await controller.findOne("2");
    expect(serviceMock.findOne).toHaveBeenCalledWith(2);
    expect(res).toEqual({ id: 2 });
  });

  it("create delegates to service", async () => {
    (serviceMock.create as any).mockResolvedValue({ id: 3 });
    const res = await controller.create({
      name: "Sub",
      businessCategoryId: 10,
    } as any);
    expect(serviceMock.create).toHaveBeenCalled();
    expect(res).toEqual({ id: 3 });
  });

  it("update delegates to service", async () => {
    (serviceMock.update as any).mockResolvedValue({ id: 4 });
    const res = await controller.update("4", { name: "New" } as any);
    expect(serviceMock.update).toHaveBeenCalledWith(4, { name: "New" });
    expect(res).toEqual({ id: 4 });
  });

  it("remove delegates to service", async () => {
    (serviceMock.remove as any).mockResolvedValue({ id: 5 });
    const res = await controller.remove("5");
    expect(serviceMock.remove).toHaveBeenCalledWith(5);
    expect(res).toEqual({ id: 5 });
  });
});
