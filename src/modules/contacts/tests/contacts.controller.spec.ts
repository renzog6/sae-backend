// filepath: sae-backend/src/modules/contacts/tests/contacts.controller.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { ContactsController } from "../controllers/contacts.controller";
import { ContactsService } from "../services/contacts.service";

const serviceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByCompany: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe("ContactsController", () => {
  let controller: ContactsController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [{ provide: ContactsService, useValue: serviceMock }],
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("create delegates to service", async () => {
    (serviceMock.create as any).mockResolvedValue({ id: 1 });
    const res = await controller.create({
      type: "EMAIL",
      value: "a@b.com",
    } as any);
    expect(serviceMock.create).toHaveBeenCalled();
    expect(res).toEqual({ data: { id: 1 } });
  });

  it("findAll delegates to service", async () => {
    (serviceMock.findAll as any).mockResolvedValue({
      data: [],
      meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    });
    const res = await controller.findAll({ page: 1, limit: 10 } as any);
    expect(serviceMock.findAll).toHaveBeenCalled();
    expect(res).toEqual({
      data: [],
      meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    });
  });

  it("findByCompany delegates to service", async () => {
    (serviceMock.findByCompany as any).mockResolvedValue({
      data: [],
      meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    });
    const res = await controller.findByCompany("1", {
      page: 1,
      limit: 10,
    } as any);
    expect(serviceMock.findByCompany).toHaveBeenCalledWith("1", {
      page: 1,
      limit: 10,
    } as any);
    expect(res).toEqual({
      data: [],
      meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    });
  });

  it("findOne delegates to service", async () => {
    (serviceMock.findOne as any).mockResolvedValue({ id: 1 });
    const res = await controller.findOne("1");
    expect(serviceMock.findOne).toHaveBeenCalledWith("1");
    expect(res).toEqual({ data: { id: 1 } });
  });

  it("update delegates to service", async () => {
    (serviceMock.update as any).mockResolvedValue({ id: 1 });
    const res = await controller.update("1", { value: "x@y.com" } as any);
    expect(serviceMock.update).toHaveBeenCalledWith("1", {
      value: "x@y.com",
    } as any);
    expect(res).toEqual({ data: { id: 1 } });
  });

  it("remove delegates to service", async () => {
    (serviceMock.remove as any).mockResolvedValue({ id: "1" });
    const res = await controller.remove("1");
    expect(serviceMock.remove).toHaveBeenCalledWith("1");
    expect(res).toEqual({ data: { id: "1" } });
  });
});
