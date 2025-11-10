// filepath: sae-backend/src/modules/documents/tests/documents.controller.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { DocumentsController } from "../controllers/documents.controller";
import { DocumentsService } from "../services/documents.service";

const serviceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe("DocumentsController", () => {
  let controller: DocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers: [{ provide: DocumentsService, useValue: serviceMock }],
    }).compile();

    controller = module.get<DocumentsController>(DocumentsController);
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("create delegates to service", async () => {
    (serviceMock.create as any).mockResolvedValue({ id: 1 });
    const res = await controller.create({
      filename: "f",
      mimetype: "m",
      size: 1,
      path: "p",
    } as any);
    expect(serviceMock.create).toHaveBeenCalled();
    expect(res).toEqual({ id: 1 });
  });

  it("findAll delegates to service", async () => {
    (serviceMock.findAll as any).mockResolvedValue([]);
    const res = await controller.findAll();
    expect(serviceMock.findAll).toHaveBeenCalled();
    expect(res).toEqual([]);
  });

  it("findOne delegates to service", async () => {
    (serviceMock.findOne as any).mockResolvedValue({ id: 1 });
    const res = await controller.findOne("1");
    expect(serviceMock.findOne).toHaveBeenCalledWith(1);
    expect(res).toEqual({ id: 1 });
  });

  it("update delegates to service", async () => {
    (serviceMock.update as any).mockResolvedValue({ id: 1 });
    const res = await controller.update("1", { description: "x" } as any);
    expect(serviceMock.update).toHaveBeenCalledWith(1, { description: "x" });
    expect(res).toEqual({ id: 1 });
  });

  it("remove delegates to service", async () => {
    (serviceMock.remove as any).mockResolvedValue({ id: 1 });
    const res = await controller.remove("1");
    expect(serviceMock.remove).toHaveBeenCalledWith(1);
    expect(res).toEqual({ id: 1 });
  });
});
