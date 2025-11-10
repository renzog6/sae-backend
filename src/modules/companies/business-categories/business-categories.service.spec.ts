// filepath: sae-backend/src/modules/companies/business-categories/business-categories.service.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { BusinessCategoriesService } from "./business-categories.service";
import { PrismaService } from "@prisma/prisma.service";

const prismaMock = {
  businessCategory: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
} as unknown as jest.Mocked<PrismaService>;

describe("BusinessCategoriesService", () => {
  let service: BusinessCategoriesService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessCategoriesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<BusinessCategoriesService>(BusinessCategoriesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("findAll returns categories with subcategories", async () => {
    (prismaMock.businessCategory.findMany as any).mockResolvedValue([
      { id: 1 },
    ]);
    const res = await service.findAll();
    expect(prismaMock.businessCategory.findMany).toHaveBeenCalledWith({
      include: { subCategories: true },
    });
    expect(res).toEqual([{ id: 1 }]);
  });

  it("findOne returns a category", async () => {
    (prismaMock.businessCategory.findUnique as any).mockResolvedValue({
      id: 1,
    });
    const res = await service.findOne(1);
    expect(prismaMock.businessCategory.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(res).toEqual({ id: 1 });
  });

  it("create creates a category", async () => {
    (prismaMock.businessCategory.create as any).mockResolvedValue({ id: 1 });
    const res = await service.create({
      name: "Cat",
      code: "C1",
      information: null,
    } as any);
    expect(prismaMock.businessCategory.create).toHaveBeenCalled();
    expect(res).toEqual({ id: 1 });
  });

  it("update updates a category", async () => {
    (prismaMock.businessCategory.update as any).mockResolvedValue({
      id: 1,
      name: "New",
    });
    const res = await service.update(1, { name: "New" } as any);
    expect(prismaMock.businessCategory.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: "New" },
    });
    expect(res).toEqual({ id: 1, name: "New" });
  });

  it("remove deletes a category", async () => {
    (prismaMock.businessCategory.delete as any).mockResolvedValue({});
    await service.remove(2);
    expect(prismaMock.businessCategory.delete).toHaveBeenCalledWith({
      where: { id: 2 },
    });
  });
});
