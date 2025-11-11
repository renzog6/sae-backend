// filepath: sae-backend/src/modules/catalogs/tests/brands.service.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { BrandsService } from "../brands.service";
import { PrismaService } from "@prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";

describe("BrandsService", () => {
  let service: BrandsService;
  let prismaService: PrismaService;

  const mockBrand = {
    id: 1,
    name: "Test Brand",
    code: "TEST",
    information: "Test information",
    isActive: true,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockBrands = [
    mockBrand,
    {
      id: 2,
      name: "Another Brand",
      code: "ANOTHER",
      information: "Another test information",
      isActive: true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const prismaMock = {
    brand: {
      findMany: jest.fn().mockResolvedValue(mockBrands),
      findUnique: jest.fn().mockResolvedValue(mockBrand),
      findFirst: jest.fn().mockResolvedValue(mockBrand),
      create: jest.fn().mockImplementation((data) => {
        return {
          id: 3,
          name: data.name || "New Brand",
          code: data.code || "NEW",
          information: data.information || "New brand information",
          isActive: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),
      update: jest.fn().mockResolvedValue(mockBrand),
      count: jest.fn().mockResolvedValue(2),
    },
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a brand", async () => {
      const createBrandDto = {
        name: "New Brand",
        code: "NEW",
        information: "New brand information",
      };

      const result = await service.create(createBrandDto);

      expect(result).toBeDefined();
      expect(result.id).toBe(3);
      expect(result.name).toBe("New Brand");
      expect(prismaService.brand.create).toHaveBeenCalledWith({
        data: createBrandDto,
      });
    });
  });

  describe("findAll", () => {
    it("should return all brands ordered by name ascending", async () => {
      const result = await service.findAll();

      expect(result).toBeDefined();
      expect(result.data).toEqual(mockBrands);
      expect(result.meta.total).toBe(2);
      expect(prismaService.brand.findMany).toHaveBeenCalledWith({
        where: { deletedAt: null },
        orderBy: { name: "asc" },
      });
    });

    it("should filter brands when search query is provided", async () => {
      const query = { q: "Test" };

      await service.findAll(query as any);

      expect(prismaService.brand.findMany).toHaveBeenCalledWith({
        where: {
          deletedAt: null,
          OR: [
            { name: { contains: "Test", mode: "insensitive" } },
            { code: { contains: "Test", mode: "insensitive" } },
            { information: { contains: "Test", mode: "insensitive" } },
          ],
        },
        orderBy: { name: "asc" },
      });
    });
  });

  describe("findOne", () => {
    it("should return a brand by id", async () => {
      const result = await service.findOne(1);

      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(prismaService.brand.findFirst).toHaveBeenCalledWith({
        where: { id: 1, deletedAt: null },
      });
    });

    it("should throw NotFoundException when brand does not exist", async () => {
      jest.spyOn(prismaService.brand, "findFirst").mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(prismaService.brand.findFirst).toHaveBeenCalledWith({
        where: { id: 999, deletedAt: null },
      });
    });
  });

  describe("update", () => {
    it("should update a brand", async () => {
      const updateBrandDto = {
        name: "Updated Brand",
        information: "Updated information",
      };

      // Ensure findFirst returns the mockBrand for successful cases
      jest.spyOn(prismaService.brand, "findFirst").mockResolvedValue(mockBrand);

      const result = await service.update(1, updateBrandDto);

      expect(result).toBeDefined();
      expect(prismaService.brand.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateBrandDto,
      });
    });

    it("should throw NotFoundException when updating non-existent brand", async () => {
      jest.spyOn(service, "findOne").mockRejectedValue(new NotFoundException());

      await expect(service.update(999, { name: "Test" })).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe("remove (soft delete)", () => {
    it("should soft delete a brand", async () => {
      // Ensure findFirst returns the mockBrand for successful cases
      const deletedBrand = {
        ...mockBrand,
        isActive: false,
        deletedAt: new Date(),
      };
      jest.spyOn(prismaService.brand, "findFirst").mockResolvedValue(mockBrand);
      jest.spyOn(prismaService.brand, "update").mockResolvedValue(deletedBrand);

      const result = await service.remove(1);

      expect(result).toBeDefined();
      expect(result.isActive).toBe(false);
      expect(result.deletedAt).toBeInstanceOf(Date);
      expect(prismaService.brand.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          isActive: false,
          deletedAt: expect.any(Date),
        },
      });
    });

    it("should throw NotFoundException when deleting non-existent brand", async () => {
      jest.spyOn(service, "findOne").mockRejectedValue(new NotFoundException());

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe("restore", () => {
    it("should restore a soft-deleted brand", async () => {
      const deletedBrand = {
        ...mockBrand,
        isActive: false,
        deletedAt: new Date(),
      };
      const restoredBrand = {
        ...mockBrand,
        isActive: true,
        deletedAt: null,
      };
      jest
        .spyOn(prismaService.brand, "findUnique")
        .mockResolvedValue(deletedBrand);
      jest
        .spyOn(prismaService.brand, "update")
        .mockResolvedValue(restoredBrand);

      const result = await service.restore(1);

      expect(result).toBeDefined();
      expect(result.isActive).toBe(true);
      expect(result.deletedAt).toBeNull();
      expect(prismaService.brand.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          isActive: true,
          deletedAt: null,
        },
      });
    });

    it("should throw NotFoundException when restoring non-existent brand", async () => {
      jest.spyOn(prismaService.brand, "findUnique").mockResolvedValue(null);

      await expect(service.restore(999)).rejects.toThrow(NotFoundException);
    });
  });
});
