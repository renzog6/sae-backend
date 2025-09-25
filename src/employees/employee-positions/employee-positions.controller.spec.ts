import { Test, TestingModule } from '@nestjs/testing';
import { EmployeePositionsController } from './employee-positions.controller';
import { EmployeePositionsService } from './employee-positions.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('EmployeePositionsController', () => {
  let controller: EmployeePositionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeePositionsController],
      providers: [
        EmployeePositionsService,
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    controller = module.get<EmployeePositionsController>(EmployeePositionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
