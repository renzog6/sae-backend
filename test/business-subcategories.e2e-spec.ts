// filepath: sae-backend/test/business-subcategories.e2e-spec.ts
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestingApp } from './utils';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Business Subcategories E2E', () => {
  let app: INestApplication;
  const prismaMock: Partial<PrismaService> = {
    businessSubCategory: {
      findMany: jest.fn().mockResolvedValue([{ id: 1, name: 'Sub' }]),
      findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'Sub' }),
      create: jest.fn().mockResolvedValue({ id: 2, name: 'New' }),
      update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated' }),
      delete: jest.fn().mockResolvedValue({}),
    },
  } as any;

  beforeAll(async () => {
    const created = await createTestingApp(prismaMock);
    app = created.app;
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /companies/subcategories should list subcategories', async () => {
    const res = await request(app.getHttpServer()).get('/companies/subcategories');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /companies/subcategories?categoryId=10 should filter by category', async () => {
    const res = await request(app.getHttpServer()).get('/companies/subcategories?categoryId=10');
    expect(res.status).toBe(200);
  });

  it('GET /companies/subcategories/:id should return one', async () => {
    const res = await request(app.getHttpServer()).get('/companies/subcategories/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('POST /companies/subcategories should create', async () => {
    const res = await request(app.getHttpServer())
      .post('/companies/subcategories')
      .send({ name: 'New', businessCategoryId: 10 });
    expect(res.status).toBe(201);
    expect(res.body.id).toBe(2);
  });

  it('PATCH /companies/subcategories/:id should update', async () => {
    const res = await request(app.getHttpServer())
      .patch('/companies/subcategories/1')
      .send({ name: 'Updated' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated');
  });

  it('DELETE /companies/subcategories/:id should delete', async () => {
    const res = await request(app.getHttpServer()).delete('/companies/subcategories/1');
    expect(res.status).toBe(200);
  });
});
