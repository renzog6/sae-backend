// filepath: sae-backend/src/modules/catalogs/units/tests/units.service.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { UnitsService } from "../units.service";
import { CreateUnitDto } from "../dto/create-unit.dto";
import { UpdateUnitDto } from "../dto/update-unit.dto";
import { PrismaService } from "@prisma/prisma.service";

describe("UnitsService", () => {
  let service: UnitsService;
  let prismaService: any;

  const mockUnit = {
    id: 1,
    name: "Kilogram",
    abbreviation: "kg",
    isActive: true,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    unit: {
      create: jest.fn().mockResolvedValue(mockUnit),
      findMany: jest.fn().mockResolvedValue([mockUnit]),
      findFirst: jest.fn().mockResolvedValue(mockUnit),
      findUnique: jest.fn().mockResolvedValue(mockUnit),
      update: jest.fn().mockResolvedValue(mockUnit),
      count: jest.fn().mockResolvedValue(1),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnitsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UnitsService>(UnitsService);
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a unit", async () => {
      const createUnitDto: CreateUnitDto = {
        name: "Kilogram",
        abbreviation: "kg",
      };

      const result = await service.create(createUnitDto);

      expect(result).toEqual(mockUnit);
      expect(prismaService.unit.create).toHaveBeenCalledWith({
        data: createUnitDto,
      });
    });
  });

  describe("findAll", () => {
    it("should return all units ordered by name ascending", async () => {
      const result = await service.findAll();

      expect(result.data).toEqual([mockUnit]);
      expect(result.meta.total).toBe(1);
      expect(result.meta.page).toBe(1);
      expect(result.meta.limit).toBe(10);
      expect(result.meta.totalPages).toBe(1);
    });

    it("should filter units when search query is provided", async () => {
      const query = { q: "kilogram", page: 1, limit: 10 } as any;
      const result = await service.findAll(query);

      expect(result.data).toEqual([mockUnit]);
      expect(prismaService.unit.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            deletedAt: null,
            OR: [
              { name: { contains: "kilogram", mode: "insensitive" } },
              { abbreviation: { contains: "kilogram", mode: "insensitive" } },
            ],
          },
        })
      );
    });
  });

  describe("findOne", () => {
    it("should return a unit by id", async () => {
      const result = await service.findOne(1);

      expect(result).toEqual(mockUnit);
      expect(prismaService.unit.findFirst).toHaveBeenCalledWith({
        where: { id: 1, deletedAt: null },
      });
    });

    it("should throw NotFoundException when unit does not exist", async () => {
      prismaService.unit.findFirst.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe("update", () => {
    it("should update a unit", async () => {
      const updateUnitDto: UpdateUnitDto = { name: "Updated Kilogram" };
      const updatedUnit = { ...mockUnit, name: "Updated Kilogram" };
      prismaService.unit.update.mockResolvedValue(updatedUnit);

      // Ensure findFirst returns the mockUnit for successful cases
      prismaService.unit.findFirst.mockResolvedValue(mockUnit);

      const result = await service.update(1, updateUnitDto);

      expect(result).toEqual(updatedUnit);
      expect(prismaService.unit.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateUnitDto,
      });
    });

    it("should throw NotFoundException when updating non-existent unit", async () => {
      const updateUnitDto: UpdateUnitDto = { name: "Updated Kilogram" };
      prismaService.unit.findFirst.mockResolvedValue(null);

      await expect(service.update(1, updateUnitDto)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe("remove (soft delete)", () => {
    it("should soft delete a unit", async () => {
      const deletedUnit = {
        ...mockUnit,
        isActive: false,
        deletedAt: new Date(),
      };
      prismaService.unit.update.mockResolvedValue(deletedUnit);

      // Ensure findFirst returns the mockUnit for successful cases
      prismaService.unit.findFirst.mockResolvedValue(mockUnit);

      const result = await service.remove(1);

      expect(result).toEqual(deletedUnit);
      expect(prismaService.unit.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          isActive: false,
          deletedAt: expect.any(Date),
        },
      });
    });

    it("should throw NotFoundException when deleting non-existent unit", async () => {
      prismaService.unit.findFirst.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe("restore", () => {
    it("should restore a soft-deleted unit", async () => {
      const deletedUnit = {
        ...mockUnit,
        isActive: false,
        deletedAt: new Date(),
      };
      const restoredUnit = { ...mockUnit, isActive: true, deletedAt: null };
      prismaService.unit.findUnique.mockResolvedValue(deletedUnit);
      prismaService.unit.update.mockResolvedValue(restoredUnit);

      const result = await service.restore(1);

      expect(result).toEqual(restoredUnit);
      expect(prismaService.unit.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          isActive: true,
          deletedAt: null,
        },
      });
    });

    it("should throw NotFoundException when restoring non-existent unit", async () => {
      prismaService.unit.findUnique.mockResolvedValue(null);

      await expect(service.restore(1)).rejects.toThrow(NotFoundException);
    });
  });
});
