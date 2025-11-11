// filepath: sae-backend/src/modules/companies/business-categories/business-categories.controller.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { BusinessCategoriesController } from "../business-categories.controller";
import { BusinessCategoriesService } from "../business-categories.service";
import { BaseQueryDto } from "@common/dto/base-query.dto";
import { CreateBusinessCategoryDto } from "../dto/create-business-category.dto";
import { UpdateBusinessCategoryDto } from "../dto/update-business-category.dto";

describe("BusinessCategoriesController", () => {
  let controller: BusinessCategoriesController;
  let service: BusinessCategoriesService;

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

  const mockCategoriesResponse = {
    data: [mockCategory],
    meta: {
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
  };

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    restore: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessCategoriesController],
      providers: [
        {
          provide: BusinessCategoriesService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<BusinessCategoriesController>(
      BusinessCategoriesController
    );
    service = module.get<BusinessCategoriesService>(BusinessCategoriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a business category", async () => {
      const createCategoryDto: CreateBusinessCategoryDto = {
        name: "New Category",
        code: "NEW",
        information: "New category information",
      };

      serviceMock.create.mockResolvedValue(mockCategory);

      const result = await controller.create(createCategoryDto);

      expect(result).toEqual({ data: mockCategory });
      expect(serviceMock.create).toHaveBeenCalledWith(createCategoryDto);
    });
  });

  describe("findAll", () => {
    it("should return all business categories", async () => {
      serviceMock.findAll.mockResolvedValue(mockCategoriesResponse);

      const query = new BaseQueryDto();
      const result = await controller.findAll(query);

      expect(result).toBe(mockCategoriesResponse);
      expect(serviceMock.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe("findOne", () => {
    it("should return a business category by id", async () => {
      serviceMock.findOne.mockResolvedValue(mockCategory);

      const result = await controller.findOne(1);

      expect(result).toEqual({ data: mockCategory });
      expect(serviceMock.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe("update", () => {
    it("should update a business category", async () => {
      serviceMock.update.mockResolvedValue(mockCategory);

      const updateCategoryDto: UpdateBusinessCategoryDto = {
        name: "Updated Category",
        information: "Updated information",
      };

      const result = await controller.update(1, updateCategoryDto);

      expect(result).toEqual({ data: mockCategory });
      expect(serviceMock.update).toHaveBeenCalledWith(1, updateCategoryDto);
    });
  });

  describe("remove", () => {
    it("should soft delete a business category", async () => {
      serviceMock.remove.mockResolvedValue(mockCategory);

      const result = await controller.remove(1);

      expect(result).toEqual({ data: mockCategory });
      expect(serviceMock.remove).toHaveBeenCalledWith(1);
    });
  });

  describe("restore", () => {
    it("should restore a soft-deleted business category", async () => {
      serviceMock.restore.mockResolvedValue(mockCategory);

      const result = await controller.restore(1);

      expect(result).toEqual({ data: mockCategory });
      expect(serviceMock.restore).toHaveBeenCalledWith(1);
    });
  });
});
