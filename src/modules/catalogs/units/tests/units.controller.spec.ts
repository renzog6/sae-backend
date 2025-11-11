// filepath: sae-backend/src/modules/catalogs/units/tests/units.controller.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { UnitsController } from "../units.controller";
import { UnitsService } from "../units.service";
import { CreateUnitDto } from "../dto/create-unit.dto";
import { UpdateUnitDto } from "../dto/update-unit.dto";

describe("UnitsController", () => {
  let controller: UnitsController;
  let service: UnitsService;

  const mockUnit = {
    id: 1,
    name: "Kilogram",
    abbreviation: "kg",
    isActive: true,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUnitsService = {
    create: jest.fn().mockResolvedValue({ data: mockUnit }),
    findAll: jest.fn().mockResolvedValue({
      data: [mockUnit],
      meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
    }),
    findOne: jest.fn().mockResolvedValue({ data: mockUnit }),
    update: jest.fn().mockResolvedValue({ data: mockUnit }),
    remove: jest.fn().mockResolvedValue({ data: "Unit deleted" }),
    restore: jest.fn().mockResolvedValue({ data: mockUnit }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitsController],
      providers: [
        {
          provide: UnitsService,
          useValue: mockUnitsService,
        },
      ],
    }).compile();

    controller = module.get<UnitsController>(UnitsController);
    service = module.get<UnitsService>(UnitsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a unit", async () => {
      const createUnitDto: CreateUnitDto = {
        name: "Kilogram",
        abbreviation: "kg",
      };

      const result = await controller.create(createUnitDto);

      expect(result).toEqual({ data: mockUnit });
      expect(service.create).toHaveBeenCalledWith(createUnitDto);
    });
  });

  describe("findAll", () => {
    it("should return all units", async () => {
      const result = await controller.findAll({} as any);

      expect(result).toEqual({
        data: [mockUnit],
        meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
      });
      expect(service.findAll).toHaveBeenCalledWith({});
    });
  });

  describe("findOne", () => {
    it("should return a unit by id", async () => {
      const result = await controller.findOne(1);

      expect(result).toEqual({ data: mockUnit });
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe("update", () => {
    it("should update a unit", async () => {
      const updateUnitDto: UpdateUnitDto = { name: "Updated Kilogram" };
      const result = await controller.update(1, updateUnitDto);

      expect(result).toEqual({ data: mockUnit });
      expect(service.update).toHaveBeenCalledWith(1, updateUnitDto);
    });
  });

  describe("remove", () => {
    it("should soft delete a unit", async () => {
      const result = await controller.remove(1);

      expect(result).toEqual({ data: "Unit deleted" });
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });

  describe("restore", () => {
    it("should restore a soft-deleted unit", async () => {
      const result = await controller.restore(1);

      expect(result).toEqual({ data: mockUnit });
      expect(service.restore).toHaveBeenCalledWith(1);
    });
  });
});
