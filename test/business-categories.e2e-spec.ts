// filepath: sae-backend/test/business-categories.e2e-spec.ts
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestingApp } from './utils';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Business Categories E2E', () => {
  let app: INestApplication;
  const prismaMock: Partial<PrismaService> = {
    businessCategory: {
      findMany: jest.fn().mockResolvedValue([{ id: 1, name: 'Cat' }]),
      findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'Cat' }),
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

  it('GET /companies/categories should list categories', async () => {
    const res = await request(app.getHttpServer()).get('/companies/categories');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /companies/categories/:id should return one', async () => {
    const res = await request(app.getHttpServer()).get('/companies/categories/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('POST /companies/categories should create', async () => {
    const res = await request(app.getHttpServer())
      .post('/companies/categories')
      .send({ name: 'New' });
    expect(res.status).toBe(201);
    expect(res.body.id).toBe(2);
  });

  it('PATCH /companies/categories/:id should update', async () => {
    const res = await request(app.getHttpServer())
      .patch('/companies/categories/1')
      .send({ name: 'Updated' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated');
  });

  it('DELETE /companies/categories/:id should delete', async () => {
    const res = await request(app.getHttpServer()).delete('/companies/categories/1');
    expect(res.status).toBe(200);
  });
});
