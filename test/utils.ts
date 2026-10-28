// filepath: sae-backend/test/utils.ts
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

export interface TestingAppOptions {
  /**
   * Sustituye los guards por uno que permite todo.
   *
   * Por defecto `true` para no romper las suites existentes, que asumen que la
   * autenticación ya está resuelta. Pasar `false` para probar la cadena real de
   * autenticación (ver `auth-guard.e2e-spec.ts`).
   */
  allowAllGuards?: boolean;
}

export async function createTestingApp(
  prismaMock: Partial<PrismaService>,
  options: TestingAppOptions = {},
) {
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

  const builder = Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(PrismaService)
    .useValue(resilientPrisma);

  // Los guards globales se registran con el token APP_GUARD, que no se puede
  // pisar con overrideProvider; por eso el bypass se hace por variable de
  // entorno, que los guards respetan solo bajo NODE_ENV=test.
  if (options.allowAllGuards ?? true) {
    process.env.AUTH_BYPASS = 'true';
  } else {
    delete process.env.AUTH_BYPASS;
  }

  const moduleFixture: TestingModule = await builder.compile();

  const app: INestApplication = moduleFixture.createNestApplication();
  await app.init();
  return { app, moduleFixture };
}
