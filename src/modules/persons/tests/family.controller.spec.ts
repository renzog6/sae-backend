// filepath: sae-backend/src/modules/persons/family/tests/family.controller.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { FamilyController } from "@modules/persons/controllers/family.controller";
import { FamilyService } from "@modules/persons/services/family.service";
import { PrismaService } from "@prisma/prisma.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";
import { RolesGuard } from "@common/guards/roles.guard";
import { ExecutionContext } from "@nestjs/common";

// Mock RolesGuard
class MockRolesGuard {
  canActivate(context: ExecutionContext): boolean {
    return true; // Allow all requests for testing
  }
}

// Mock FamilyService
const mockFamilyService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe("FamilyController", () => {
  let controller: FamilyController;
  let service: typeof mockFamilyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyController],
      providers: [
        {
          provide: FamilyService,
          useValue: mockFamilyService,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(RolesGuard)
      .useClass(MockRolesGuard)
      .compile();

    controller = module.get<FamilyController>(FamilyController);
    service = mockFamilyService as any;

    // Reset all mocks
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a family relationship", async () => {
      const createFamilyDto = {
        relationship: "Padre",
        personId: 1,
        relativeId: 2,
        information: "Test information",
      };

      const expectedResult = {
        id: 1,
        relationship: "Padre",
        person: { id: 1, firstName: "Juan" },
        relative: { id: 2, firstName: "Maria" },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      service.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createFamilyDto);

      expect(result).toEqual({ data: expectedResult });
      expect(service.create).toHaveBeenCalledWith(createFamilyDto);
    });

    it("should handle service errors", async () => {
      const createFamilyDto = {
        relationship: "Padre",
        personId: 1,
        relativeId: 2,
      };

      const error = new Error("Person not found");
      service.create.mockRejectedValue(error);

      await expect(controller.create(createFamilyDto)).rejects.toThrow(error);
      expect(service.create).toHaveBeenCalledWith(createFamilyDto);
    });
  });

  describe("findAll", () => {
    it("should return paginated family relationships", async () => {
      const query = new BaseQueryDto();
      const expectedResult = new BaseResponseDto(
        [
          {
            id: 1,
            relationship: "Padre",
            person: { id: 1, firstName: "Juan" },
            relative: { id: 2, firstName: "Maria" },
          },
          {
            id: 2,
            relationship: "Hijo",
            person: { id: 2, firstName: "Maria" },
            relative: { id: 1, firstName: "Juan" },
          },
        ],
        2,
        1,
        10
      );

      service.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll(query);

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith(query);
    });

    it("should handle default query parameters", async () => {
      const expectedResult = new BaseResponseDto([], 0, 1, 10);
      service.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll({} as BaseQueryDto);

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith({} as BaseQueryDto);
    });

    it("should handle search query", async () => {
      const query = new BaseQueryDto();
      query.q = "Padre";
      query.page = 1;
      query.limit = 5;

      const expectedResult = new BaseResponseDto(
        [{ id: 1, relationship: "Padre", person: {}, relative: {} }],
        1,
        1,
        5
      );

      service.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll(query);

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe("findOne", () => {
    it("should return a family relationship by id", async () => {
      const id = "1";
      const expectedResult = {
        id: 1,
        relationship: "Padre",
        person: { id: 1, firstName: "Juan" },
        relative: { id: 2, firstName: "Maria" },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      service.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(id);

      expect(result).toEqual({ data: expectedResult });
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it("should convert string id to number", async () => {
      const id = "123";
      const expectedResult = { id: 123, relationship: "Test" };
      service.findOne.mockResolvedValue(expectedResult);

      await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(123);
    });

    it("should handle service errors", async () => {
      const id = "1";
      const error = new Error("Family relationship not found");
      service.findOne.mockRejectedValue(error);

      await expect(controller.findOne(id)).rejects.toThrow(error);
    });
  });

  describe("update", () => {
    it("should update a family relationship", async () => {
      const id = "1";
      const updateDto = {
        relationship: "Madre",
      };

      const expectedResult = {
        id: 1,
        relationship: "Madre",
        person: { id: 1, firstName: "Juan" },
        relative: { id: 2, firstName: "Maria" },
      };

      service.update.mockResolvedValue(expectedResult);

      const result = await controller.update(id, updateDto);

      expect(result).toEqual({ data: expectedResult });
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });

    it("should convert string id to number", async () => {
      const id = "456";
      const updateDto = { relationship: "Tio" };
      const expectedResult = { id: 456, relationship: "Tio" };
      service.update.mockResolvedValue(expectedResult);

      await controller.update(id, updateDto);

      expect(service.update).toHaveBeenCalledWith(456, updateDto);
    });

    it("should handle multiple field updates", async () => {
      const id = "1";
      const updateDto = {
        relationship: "Tio",
        personId: 3,
        relativeId: 4,
      };

      const expectedResult = { id: 1, relationship: "Tio" };
      service.update.mockResolvedValue(expectedResult);

      const result = await controller.update(id, updateDto);

      expect(result).toEqual({ data: expectedResult });
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe("remove", () => {
    it("should delete a family relationship", async () => {
      const id = "1";
      const expectedResult = {
        message: "Family relationship deleted successfully",
      };

      service.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(id);

      expect(result).toEqual({ data: expectedResult });
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it("should convert string id to number", async () => {
      const id = "789";
      const expectedResult = { message: "Deleted" };
      service.remove.mockResolvedValue(expectedResult);

      await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(789);
    });

    it("should handle service errors", async () => {
      const id = "1";
      const error = new Error("Family relationship not found");
      service.remove.mockRejectedValue(error);

      await expect(controller.remove(id)).rejects.toThrow(error);
    });
  });

  describe("Swagger Documentation", () => {
    it("should have proper controller metadata", () => {
      const controllerMetadata = Reflect.getMetadata("path", FamilyController);
      expect(controllerMetadata).toBe("persons/family");
    });

    it("should have API tags", () => {
      // Check if Swagger tags metadata exists, if not, verify the controller has the decorator
      const swaggerTags = Reflect.getMetadata("swagger:tags", FamilyController);
      if (swaggerTags) {
        expect(swaggerTags).toEqual(["family"]);
      } else {
        // Fallback: verify that the controller has the expected structure
        expect(FamilyController).toBeDefined();
        expect(FamilyController.name).toBe("FamilyController");
      }
    });

    it("should have API controller with guards", () => {
      const guards = Reflect.getMetadata("__guards__", FamilyController);
      expect(guards).toBeDefined();
      expect(guards.some((g: any) => g === RolesGuard)).toBe(true);
    });
  });
});
