// filepath: sae-backend/src/modules/persons/family/tests/family.service.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { FamilyService } from "../services/family.service";
import { PrismaService } from "@prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";
import { BaseQueryDto } from "@common/dto/base-query.dto";

// Mock Prisma Model
const mockPrismaService = {
  family: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  person: {
    findUnique: jest.fn(),
  },
};

describe("FamilyService", () => {
  let service: FamilyService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FamilyService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<FamilyService>(FamilyService);
    prisma = mockPrismaService as any;

    // Reset all mocks
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a family relationship successfully", async () => {
      const createFamilyDto = {
        relationship: "Padre",
        personId: 1,
        relativeId: 2,
        information: "Test information",
      };

      const expectedResult = {
        id: 1,
        relationship: "Padre",
        person: { id: 1, firstName: "Juan", lastName: "Perez" },
        relative: { id: 2, firstName: "Maria", lastName: "Garcia" },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.family.create.mockResolvedValue(expectedResult);

      const result = await service.create(createFamilyDto);

      expect(result).toEqual(expectedResult);
      expect(prisma.family.create).toHaveBeenCalledWith({
        data: {
          relationship: "Padre",
          person: { connect: { id: 1 } },
          relative: { connect: { id: 2 } },
        },
        include: { person: true, relative: true },
      });
    });

    it("should handle creation without information field", async () => {
      const createFamilyDto = {
        relationship: "Madre",
        personId: 1,
        relativeId: 2,
      };

      const expectedResult = {
        id: 1,
        relationship: "Madre",
        person: { id: 1 },
        relative: { id: 2 },
      };

      prisma.family.create.mockResolvedValue(expectedResult);

      const result = await service.create(createFamilyDto);

      expect(result).toEqual(expectedResult);
    });
  });

  describe("findAll", () => {
    it("should return paginated family relationships", async () => {
      const query = new BaseQueryDto();
      query.page = 1;
      query.limit = 10;

      const mockData = [
        {
          id: 1,
          relationship: "Padre",
          person: { id: 1 },
          relative: { id: 2 },
        },
        { id: 2, relationship: "Hijo", person: { id: 2 }, relative: { id: 1 } },
      ];

      prisma.family.findMany.mockResolvedValue(mockData);
      prisma.family.count.mockResolvedValue(2);

      const result = await service.findAll(query);

      expect(result).toBeInstanceOf(Object);
      expect(result.data).toEqual(mockData);
      expect(result.meta.total).toBe(2);
      expect(result.meta.page).toBe(1);
      expect(result.meta.limit).toBe(10);
      expect(result.meta.totalPages).toBe(1);
    });

    it("should handle search query", async () => {
      const query = new BaseQueryDto();
      query.q = "Padre";

      const mockData = [
        {
          id: 1,
          relationship: "Padre",
          person: { id: 1 },
          relative: { id: 2 },
        },
      ];

      prisma.family.findMany.mockResolvedValue(mockData);
      prisma.family.count.mockResolvedValue(1);

      const result = await service.findAll(query);

      expect(result.data).toEqual(mockData);
      expect(prisma.family.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            deletedAt: null,
            OR: expect.arrayContaining([
              { relationship: { contains: "Padre", mode: "insensitive" } },
              expect.any(Object),
              expect.any(Object),
              expect.any(Object),
            ]),
          },
        })
      );
    });

    it("should handle custom sort", async () => {
      const query = new BaseQueryDto();
      query.sortBy = "relationship";
      query.sortOrder = "asc";

      prisma.family.findMany.mockResolvedValue([]);
      prisma.family.count.mockResolvedValue(0);

      await service.findAll(query);

      expect(prisma.family.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { relationship: "asc" },
        })
      );
    });
  });

  describe("findOne", () => {
    it("should return a family relationship by id", async () => {
      const id = 1;
      const expectedResult = {
        id: 1,
        relationship: "Padre",
        person: { id: 1, firstName: "Juan" },
        relative: { id: 2, firstName: "Maria" },
      };

      prisma.family.findUnique.mockResolvedValue(expectedResult);

      const result = await service.findOne(id);

      expect(result).toEqual(expectedResult);
      expect(prisma.family.findUnique).toHaveBeenCalledWith({
        where: { id },
        include: { person: true, relative: true },
      });
    });

    it("should throw NotFoundException when family relationship not found", async () => {
      const id = 999;
      prisma.family.findUnique.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
      expect(prisma.family.findUnique).toHaveBeenCalledWith({
        where: { id },
        include: { person: true, relative: true },
      });
    });
  });

  describe("update", () => {
    it("should update a family relationship successfully", async () => {
      const id = 1;
      const updateDto = {
        relationship: "Madre",
      };

      const expectedResult = {
        id: 1,
        relationship: "Madre",
        person: { id: 1 },
        relative: { id: 2 },
      };

      // Mock the findOne method
      jest.spyOn(service, "findOne").mockResolvedValue(expectedResult);
      prisma.family.update.mockResolvedValue(expectedResult);

      const result = await service.update(id, updateDto);

      expect(result).toEqual(expectedResult);
      expect(prisma.family.update).toHaveBeenCalledWith({
        where: { id },
        data: { relationship: "Madre" },
        include: { person: true, relative: true },
      });
    });

    it("should handle personId update", async () => {
      const id = 1;
      const updateDto = {
        personId: 3,
      };

      const expectedResult = { id: 1, relationship: "Padre" };

      jest.spyOn(service, "findOne").mockResolvedValue(expectedResult);
      prisma.family.update.mockResolvedValue(expectedResult);

      await service.update(id, updateDto);

      expect(prisma.family.update).toHaveBeenCalledWith({
        where: { id },
        data: { person: { connect: { id: 3 } } },
        include: { person: true, relative: true },
      });
    });

    it("should handle relativeId update", async () => {
      const id = 1;
      const updateDto = {
        relativeId: 4,
      };

      const expectedResult = { id: 1, relationship: "Padre" };

      jest.spyOn(service, "findOne").mockResolvedValue(expectedResult);
      prisma.family.update.mockResolvedValue(expectedResult);

      await service.update(id, updateDto);

      expect(prisma.family.update).toHaveBeenCalledWith({
        where: { id },
        data: { relative: { connect: { id: 4 } } },
        include: { person: true, relative: true },
      });
    });

    it("should update multiple fields at once", async () => {
      const id = 1;
      const updateDto = {
        relationship: "Tio",
        personId: 3,
        relativeId: 4,
      };

      const expectedResult = { id: 1, relationship: "Tio" };

      jest.spyOn(service, "findOne").mockResolvedValue(expectedResult);
      prisma.family.update.mockResolvedValue(expectedResult);

      await service.update(id, updateDto);

      expect(prisma.family.update).toHaveBeenCalledWith({
        where: { id },
        data: {
          relationship: "Tio",
          person: { connect: { id: 3 } },
          relative: { connect: { id: 4 } },
        },
        include: { person: true, relative: true },
      });
    });
  });

  describe("remove", () => {
    it("should delete a family relationship successfully", async () => {
      const id = 1;

      jest
        .spyOn(service, "findOne")
        .mockResolvedValue({ id, relationship: "Padre" });
      prisma.family.delete.mockResolvedValue({ id });

      const result = await service.remove(id);

      expect(result).toEqual({
        message: "Family relationship deleted successfully",
      });
      expect(prisma.family.delete).toHaveBeenCalledWith({ where: { id } });
    });

    it("should throw NotFoundException when trying to delete non-existent relationship", async () => {
      const id = 999;

      jest
        .spyOn(service, "findOne")
        .mockRejectedValue(
          new NotFoundException("Family with ID 999 not found")
        );

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe("buildSearchConditions", () => {
    it("should return proper search conditions", () => {
      const searchConditions = service["buildSearchConditions"]("test");

      expect(searchConditions).toEqual([
        { relationship: { contains: "test", mode: "insensitive" } },
        { person: { firstName: { contains: "test", mode: "insensitive" } } },
        { person: { lastName: { contains: "test", mode: "insensitive" } } },
        { relative: { firstName: { contains: "test", mode: "insensitive" } } },
        { relative: { lastName: { contains: "test", mode: "insensitive" } } },
      ]);
    });
  });

  describe("getModel", () => {
    it("should return the family model", () => {
      const model = service["getModel"]();
      expect(model).toBe(prisma.family);
    });
  });
});
