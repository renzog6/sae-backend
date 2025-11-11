import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeVacationsController } from "./employee-vacations.controller";
import { EmployeeVacationsService } from "./employee-vacations.service";
import { PrismaService } from "@prisma/prisma.service";
import { HistoryLogService } from "../../history/services/history-log.service";

describe("EmployeeVacationsController", () => {
  let controller: EmployeeVacationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeVacationsController],
      providers: [
        EmployeeVacationsService,
        { provide: PrismaService, useValue: {} },
        { provide: HistoryLogService, useValue: {} },
      ],
    }).compile();

    controller = module.get<EmployeeVacationsController>(
      EmployeeVacationsController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
