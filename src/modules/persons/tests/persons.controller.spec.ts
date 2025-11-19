// filepath: sae-backend/src/modules/persons/tests/persons.controller.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { PersonsController } from "@modules/persons/controllers/persons.controller";
import { PersonsService } from "@modules/persons/services/persons.service";
import { PrismaService } from "@prisma/prisma.service";

describe("PersonsController", () => {
  let controller: PersonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonsController],
      providers: [PersonsService, { provide: PrismaService, useValue: {} }],
    }).compile();

    controller = module.get<PersonsController>(PersonsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
