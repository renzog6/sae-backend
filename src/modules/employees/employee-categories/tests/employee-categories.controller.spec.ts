import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeCategoriesController } from "../employee-categories.controller";
import { EmployeeCategoriesService } from "../employee-categories.service";
import { PrismaService } from "@prisma/prisma.service";

describe("EmployeeCategoriesController", () => {
  let controller: EmployeeCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeCategoriesController],
      providers: [
        EmployeeCategoriesService,
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    controller = module.get<EmployeeCategoriesController>(
      EmployeeCategoriesController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
