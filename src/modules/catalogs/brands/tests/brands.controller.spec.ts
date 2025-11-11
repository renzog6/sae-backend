// filepath: sae-backend/src/modules/catalogs/tests/brands.controller.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { BrandsController } from "../brands.controller";
import { BrandsService } from "../brands.service";
import { BaseQueryDto } from "@common/dto/base-query.dto";
import { CreateBrandDto } from "../dto/create-brand.dto";
import { UpdateBrandDto } from "../dto/update-brand.dto";

describe("BrandsController", () => {
  let controller: BrandsController;
  let service: BrandsService;

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

  const mockBrandsResponse = {
    data: [mockBrand],
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
      controllers: [BrandsController],
      providers: [
        {
          provide: BrandsService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
    service = module.get<BrandsService>(BrandsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a brand", async () => {
      const createBrandDto: CreateBrandDto = {
        name: "New Brand",
        code: "NEW",
        information: "New brand information",
      };

      serviceMock.create.mockResolvedValue(mockBrand);

      const result = await controller.create(createBrandDto);

      expect(result).toEqual({ data: mockBrand });
      expect(serviceMock.create).toHaveBeenCalledWith(createBrandDto);
    });
  });

  describe("findAll", () => {
    it("should return all brands", async () => {
      serviceMock.findAll.mockResolvedValue(mockBrandsResponse);

      const query = new BaseQueryDto();
      const result = await controller.findAll(query);

      expect(result).toBe(mockBrandsResponse);
      expect(serviceMock.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe("findOne", () => {
    it("should return a brand by id", async () => {
      serviceMock.findOne.mockResolvedValue(mockBrand);

      const result = await controller.findOne(1);

      expect(result).toEqual({ data: mockBrand });
      expect(serviceMock.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe("update", () => {
    it("should update a brand", async () => {
      serviceMock.update.mockResolvedValue(mockBrand);

      const updateBrandDto: UpdateBrandDto = {
        name: "Updated Brand",
        information: "Updated information",
      };

      const result = await controller.update(1, updateBrandDto);

      expect(result).toEqual({ data: mockBrand });
      expect(serviceMock.update).toHaveBeenCalledWith(1, updateBrandDto);
    });
  });

  describe("remove", () => {
    it("should soft delete a brand", async () => {
      serviceMock.remove.mockResolvedValue(mockBrand);

      const result = await controller.remove(1);

      expect(result).toEqual({ data: mockBrand });
      expect(serviceMock.remove).toHaveBeenCalledWith(1);
    });
  });

  describe("restore", () => {
    it("should restore a soft-deleted brand", async () => {
      serviceMock.restore.mockResolvedValue(mockBrand);

      const result = await controller.restore(1);

      expect(result).toEqual({ data: mockBrand });
      expect(serviceMock.restore).toHaveBeenCalledWith(1);
    });
  });
});
