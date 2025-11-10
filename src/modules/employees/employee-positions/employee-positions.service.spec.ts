import { Test, TestingModule } from "@nestjs/testing";
import { EmployeePositionsService } from "./employee-positions.service";
import { PrismaService } from "@prisma/prisma.service";

describe("EmployeePositionsService", () => {
  let service: EmployeePositionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeePositionsService,
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    service = module.get<EmployeePositionsService>(EmployeePositionsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
