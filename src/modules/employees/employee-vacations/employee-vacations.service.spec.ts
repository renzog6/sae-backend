import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeVacationsService } from "./employee-vacations.service";
import { PrismaService } from "@prisma/prisma.service";
import { HistoryLogService } from "../../history/services/history-log.service";
import * as fs from "fs";
import { NotFoundException } from "@nestjs/common";

describe("EmployeeVacationsService", () => {
  let service: EmployeeVacationsService;

  beforeEach(async () => {
    const prismaMock = {
      employeeVacation: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
      },
    } as unknown as PrismaService;

    const historyLogMock = {
      createLog: jest.fn(),
    } as unknown as HistoryLogService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeVacationsService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: HistoryLogService, useValue: historyLogMock },
      ],
    }).compile();

    service = module.get<EmployeeVacationsService>(EmployeeVacationsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("create() should compute endDate and default year", async () => {
    const prisma = (service as any).prisma as PrismaService;
    (prisma.employeeVacation.create as any).mockImplementation(
      ({ data }: any) => ({ id: 1, ...data })
    );

    const startDate = "2025-01-10T00:00:00.000Z";
    const res = await service.create({ employeeId: 1, days: 10, startDate });

    expect(prisma.employeeVacation.create).toHaveBeenCalled();
    expect(res.startDate.toISOString()).toBe(new Date(startDate).toISOString());
    // endDate = start + days - 1 = 2025-01-19
    expect(new Date(res.endDate).toISOString()).toBe(
      new Date("2025-01-19T00:00:00.000Z").toISOString()
    );
    expect(res.year).toBe(2025);
  });

  it("generateVacationPdf() should throw if template is missing", async () => {
    const prisma = (service as any).prisma as PrismaService;
    (prisma.employeeVacation.findUnique as any).mockResolvedValue({
      id: 1,
      days: 5,
      startDate: new Date("2025-01-01T00:00:00.000Z"),
      settlementDate: new Date("2025-01-01T00:00:00.000Z"),
      employee: { person: { firstName: "John", lastName: "Doe" } },
    });

    const existsSpy = jest
      .spyOn(fs, "existsSync")
      .mockReturnValue(false as any);

    await expect(service.generateVacationPdf(1)).rejects.toBeInstanceOf(
      NotFoundException
    );

    existsSpy.mockRestore();
  });
});
