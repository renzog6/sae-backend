// filepath: sae-backend/test/utils.ts
import { INestApplication, CanActivate, ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { JwtAuthGuard } from '../src/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../src/common/guards/roles.guard';

class AllowAllGuard implements CanActivate {
  canActivate(_context: ExecutionContext): boolean {
    return true;
  }
}

export async function createTestingApp(prismaMock: Partial<PrismaService>) {
  // Create a resilient Prisma mock that provides default mocked methods
  const defaultModel = () => ({
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  });

  const resilientPrisma = new Proxy({ ...(prismaMock as any) }, {
    get(target, prop: string) {
      if (prop in target) return (target as any)[prop];
      // return default mocked model for any unknown property (e.g., user, contact, etc.)
      const model = defaultModel();
      (target as any)[prop] = model;
      return model;
    },
  });

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(PrismaService)
    .useValue(resilientPrisma)
    .overrideGuard(JwtAuthGuard)
    .useClass(AllowAllGuard)
    .overrideGuard(RolesGuard)
    .useClass(AllowAllGuard)
    .compile();

  const app: INestApplication = moduleFixture.createNestApplication();
  await app.init();
  return { app, moduleFixture };
}
