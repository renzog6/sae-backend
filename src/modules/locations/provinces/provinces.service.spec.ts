// filepath: sae-backend/src/modules/locations/provinces/provinces.service.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { ProvincesService } from "./provinces.service";
import { PrismaService } from "@prisma/prisma.service";

describe("ProvincesService", () => {
  let service: ProvincesService;
  const prismaMock: Partial<PrismaService> = {
    province: {
      findMany: jest.fn().mockResolvedValue([{ id: 1 }]),
      findUnique: jest.fn().mockResolvedValue({ id: 1 }),
      create: jest.fn().mockResolvedValue({ id: 2 }),
      update: jest.fn().mockResolvedValue({ id: 1, name: "UP" }),
      delete: jest.fn().mockResolvedValue({ id: 1 }),
    },
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvincesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ProvincesService>(ProvincesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("findAll should return list", async () => {
    const data = await service.findAll();
    expect(Array.isArray(data)).toBe(true);
  });

  it("findOne should return a record", async () => {
    const data = await service.findOne(1);
    expect(data.id).toBe(1);
  });

  it("create should return created", async () => {
    const data = await service.create({ name: "NP", code: "NP" } as any);
    expect(data.id).toBe(2);
  });

  it("update should return updated", async () => {
    const data = await service.update(1, { name: "UP" } as any);
    expect(data.name).toBe("UP");
  });

  it("remove should return deleted", async () => {
    const data = await service.remove(1);
    expect(data.id).toBe(1);
  });

  it("findByCode should return a record", async () => {
    (prismaMock.province!.findUnique as jest.Mock).mockResolvedValueOnce({
      id: 7,
      code: "XX",
    });
    const data = await service.findByCode("XX");
    expect(data.code).toBe("XX");
  });

  it("findByCountry should return list", async () => {
    const data = await service.findByCountry(3);
    expect(Array.isArray(data)).toBe(true);
  });
});
