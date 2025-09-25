import { Test, TestingModule } from '@nestjs/testing';
import { FamilyController } from './family.controller';
import { FamilyService } from './family.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('FamilyController', () => {
  let controller: FamilyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyController],
      providers: [FamilyService, { provide: PrismaService, useValue: {} }],
    }).compile();

    controller = module.get<FamilyController>(FamilyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
