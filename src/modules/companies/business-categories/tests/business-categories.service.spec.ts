// filepath: sae-backend/src/modules/companies/business-categories/business-categories.service.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { BusinessCategoriesService } from "../business-categories.service";
import { PrismaService } from "@prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";

describe("BusinessCategoriesService", () => {
  let service: BusinessCategoriesService;
  let prismaService: PrismaService;

  const mockCategory = {
    id: 1,
    name: "Test Category",
    code: "TEST",
    information: "Test information",
    isActive: true,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    subCategories: [],
  };

  const mockCategories = [
    mockCategory,
    {
      id: 2,
      name: "Another Category",
      code: "ANOTHER",
      information: "Another test information",
      isActive: true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      subCategories: [],
    },
  ];

  const prismaMock = {
    businessCategory: {
      findMany: jest.fn().mockResolvedValue(mockCategories),
      findUnique: jest.fn().mockResolvedValue(mockCategory),
      findFirst: jest.fn().mockResolvedValue(mockCategory),
      create: jest.fn().mockResolvedValue({ ...mockCategory, id: 3 }),
      update: jest.fn().mockResolvedValue(mockCategory),
      count: jest.fn().mockResolvedValue(2),
    },
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessCategoriesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<BusinessCategoriesService>(BusinessCategoriesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a business category", async () => {
      const createCategoryDto = {
        name: "New Category",
        code: "NEW",
        information: "New category information",
      };

      const result = await service.create(createCategoryDto);

      expect(result).toBeDefined();
      expect(result.id).toBe(3);
      expect(result.name).toBe("New Category");
      expect(prismaService.businessCategory.create).toHaveBeenCalledWith({
        data: createCategoryDto,
      });
    });
  });

  describe("findAll", () => {
    it("should return all business categories ordered by name ascending", async () => {
      const result = await service.findAll();

      expect(result).toBeDefined();
      expect(result.data).toEqual(mockCategories);
      expect(result.meta.total).toBe(2);
      expect(prismaService.businessCategory.findMany).toHaveBeenCalledWith({
        where: { deletedAt: null },
        include: { subCategories: true },
        orderBy: { name: "asc" },
      });
    });

    it("should filter business categories when search query is provided", async () => {
      const query = { q: "Test" };

      await service.findAll(query as any);

      expect(prismaService.businessCategory.findMany).toHaveBeenCalledWith({
        where: {
          deletedAt: null,
          OR: [
            { name: { contains: "Test", mode: "insensitive" } },
            { code: { contains: "Test", mode: "insensitive" } },
            { information: { contains: "Test", mode: "insensitive" } },
          ],
        },
        include: { subCategories: true },
        orderBy: { name: "asc" },
      });
    });
  });

  describe("findOne", () => {
    it("should return a business category by id", async () => {
      const result = await service.findOne(1);

      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(prismaService.businessCategory.findFirst).toHaveBeenCalledWith({
        where: { id: 1, deletedAt: null },
        include: { subCategories: true },
      });
    });

    it("should throw NotFoundException when category does not exist", async () => {
      jest
        .spyOn(prismaService.businessCategory, "findFirst")
        .mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaService.businessCategory.findFirst).toHaveBeenCalledWith({
        where: { id: 999, deletedAt: null },
        include: { subCategories: true },
      });
    });
  });

  describe("update", () => {
    it("should update a business category", async () => {
      const updateCategoryDto = {
        name: "Updated Category",
        information: "Updated information",
      };

      const result = await service.update(1, updateCategoryDto);

      expect(result).toBeDefined();
      expect(prismaService.businessCategory.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateCategoryDto,
      });
    });

    it("should throw NotFoundException when updating non-existent category", async () => {
      jest.spyOn(service, "findOne").mockRejectedValue(new NotFoundException());

      await expect(service.update(999, { name: "Test" })).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe("remove (soft delete)", () => {
    it("should soft delete a business category", async () => {
      const result = await service.remove(1);

      expect(result).toBeDefined();
      expect(result.isActive).toBe(false);
      expect(result.deletedAt).toBeInstanceOf(Date);
      expect(prismaService.businessCategory.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          isActive: false,
          deletedAt: expect.any(Date),
        },
      });
    });

    it("should throw NotFoundException when deleting non-existent category", async () => {
      jest.spyOn(service, "findOne").mockRejectedValue(new NotFoundException());

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe("restore", () => {
    it("should restore a soft-deleted business category", async () => {
      const deletedCategory = {
        ...mockCategory,
        isActive: false,
        deletedAt: new Date(),
      };
      jest
        .spyOn(prismaService.businessCategory, "findUnique")
        .mockResolvedValue(deletedCategory);

      const result = await service.restore(1);

      expect(result).toBeDefined();
      expect(result.isActive).toBe(true);
      expect(result.deletedAt).toBeNull();
      expect(prismaService.businessCategory.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          isActive: true,
          deletedAt: null,
        },
      });
    });

    it("should throw NotFoundException when restoring non-existent category", async () => {
      jest
        .spyOn(prismaService.businessCategory, "findUnique")
        .mockResolvedValue(null);

      await expect(service.restore(999)).rejects.toThrow(NotFoundException);
    });
  });
});
