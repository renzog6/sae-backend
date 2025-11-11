// filepath: sae-backend/src/modules/companies/business-subcategories/business-subcategories.service.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { BusinessSubcategoriesService } from "../business-subcategories.service";
import { PrismaService } from "@prisma/prisma.service";

const prismaMock = {
  businessSubCategory: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
} as unknown as jest.Mocked<PrismaService>;

describe("BusinessSubcategoriesService", () => {
  let service: BusinessSubcategoriesService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessSubcategoriesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<BusinessSubcategoriesService>(
      BusinessSubcategoriesService
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("findAll returns subcategories", async () => {
    (prismaMock.businessSubCategory.findMany as any).mockResolvedValue([
      { id: 1 },
    ]);
    const res = await service.findAll();
    expect(prismaMock.businessSubCategory.findMany).toHaveBeenCalledWith({
      where: { deletedAt: null },
      include: {
        businessCategory: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
    expect(res).toBeInstanceOf(Object);
    expect(res.data).toEqual([{ id: 1 }]);
  });

  it("findOne returns a subcategory", async () => {
    (prismaMock.businessSubCategory.findFirst as any).mockResolvedValue({
      id: 2,
    });
    const res = await service.findOne(2);
    expect(prismaMock.businessSubCategory.findFirst).toHaveBeenCalledWith({
      where: { id: 2, deletedAt: null },
      include: {
        businessCategory: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
    expect(res).toEqual({ id: 2 });
  });

  it("create creates a subcategory", async () => {
    (prismaMock.businessSubCategory.create as any).mockResolvedValue({ id: 1 });
    const res = await service.create({
      name: "Sub",
      businessCategoryId: 10,
    } as any);
    expect(prismaMock.businessSubCategory.create).toHaveBeenCalled();
    expect(res).toEqual({ id: 1 });
  });

  it("update updates a subcategory", async () => {
    (prismaMock.businessSubCategory.findFirst as any).mockResolvedValue({
      id: 1,
      name: "Old",
    });
    (prismaMock.businessSubCategory.update as any).mockResolvedValue({
      id: 1,
      name: "New",
    });
    const res = await service.update(1, { name: "New" } as any);
    expect(prismaMock.businessSubCategory.findFirst).toHaveBeenCalledWith({
      where: { id: 1, deletedAt: null },
      include: {
        businessCategory: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
    expect(prismaMock.businessSubCategory.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: "New" },
    });
    expect(res).toEqual({ id: 1, name: "New" });
  });

  it("remove deletes a subcategory", async () => {
    (prismaMock.businessSubCategory.findFirst as any).mockResolvedValue({
      id: 3,
      name: "To Delete",
    });
    (prismaMock.businessSubCategory.update as any).mockResolvedValue({
      id: 3,
      name: "To Delete",
      isActive: false,
      deletedAt: new Date(),
    });
    const res = await service.remove(3);
    expect(prismaMock.businessSubCategory.findFirst).toHaveBeenCalledWith({
      where: { id: 3, deletedAt: null },
      include: {
        businessCategory: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
    expect(prismaMock.businessSubCategory.update).toHaveBeenCalledWith({
      where: { id: 3 },
      data: {
        isActive: false,
        deletedAt: expect.any(Date),
      },
    });
    expect(res.isActive).toBe(false);
    expect(res.deletedAt).toBeInstanceOf(Date);
  });
});
