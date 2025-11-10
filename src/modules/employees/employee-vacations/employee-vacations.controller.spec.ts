import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeVacationsController } from "./employee-vacations.controller";
import { EmployeeVacationsService } from "./employee-vacations.service";
import { PrismaService } from "@prisma/prisma.service";

describe("EmployeeVacationsController", () => {
  let controller: EmployeeVacationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeVacationsController],
      providers: [
        EmployeeVacationsService,
        { provide: PrismaService, useValue: {} },
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
