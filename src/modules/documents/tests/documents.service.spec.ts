// filepath: sae-backend/src/modules/documents/tests/documents.service.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { DocumentsService } from "../services/documents.service";
import { PrismaService } from "@prisma/prisma.service";

const prismaMock = {
  document: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findUniqueOrThrow: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
} as unknown as PrismaService;

describe("DocumentsService", () => {
  let service: DocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<DocumentsService>(DocumentsService);
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("create calls prisma.document.create", async () => {
    (prismaMock.document.create as any).mockResolvedValue({ id: 1 });
    const res = await service.create({
      filename: "f",
      mimetype: "m",
      size: 1,
      path: "p",
    });
    expect(prismaMock.document.create).toHaveBeenCalledWith({
      data: { filename: "f", mimetype: "m", size: 1, path: "p" },
    });
    expect(res).toEqual({ id: 1 });
  });

  it("findAll calls prisma.document.findMany", async () => {
    (prismaMock.document.findMany as any).mockResolvedValue([]);
    const res = await service.findAll();
    expect(prismaMock.document.findMany).toHaveBeenCalled();
    expect(res).toEqual([]);
  });

  it("findOne calls prisma.document.findUniqueOrThrow", async () => {
    (prismaMock.document.findUniqueOrThrow as any).mockResolvedValue({ id: 1 });
    const res = await service.findOne(1);
    expect(prismaMock.document.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(res).toEqual({ id: 1 });
  });

  it("update calls prisma.document.update", async () => {
    (prismaMock.document.update as any).mockResolvedValue({
      id: 1,
      description: "x",
    });
    const res = await service.update(1, { description: "x" });
    expect(prismaMock.document.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { description: "x" },
    });
    expect(res).toEqual({ id: 1, description: "x" });
  });

  it("remove calls prisma.document.delete", async () => {
    (prismaMock.document.findUnique as any).mockResolvedValue({
      id: 1,
      path: undefined,
    });
    (prismaMock.document.delete as any).mockResolvedValue({ id: 1 });
    const res = await service.remove(1);
    expect(prismaMock.document.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(res).toEqual({ id: 1 });
  });
});
