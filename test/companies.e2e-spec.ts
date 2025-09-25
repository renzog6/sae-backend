// filepath: sae-backend/test/companies.e2e-spec.ts
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestingApp } from './utils';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Companies E2E', () => {
  let app: INestApplication;
  const prismaMock: Partial<PrismaService> = {
    company: {
      findMany: jest.fn().mockResolvedValue([{ id: 1, name: 'ACME' }]),
      count: jest.fn().mockResolvedValue(1),
      findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'ACME' }),
      create: jest.fn().mockResolvedValue({ id: 2, name: 'New' }),
      update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated' }),
      delete: jest.fn().mockResolvedValue({}),
    },
    address: {
      create: jest.fn().mockResolvedValue({ id: 10 }),
      update: jest.fn().mockResolvedValue({ id: 10 }),
    },
  } as any;

  beforeAll(async () => {
    const created = await createTestingApp(prismaMock);
    app = created.app;
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /companies should list companies', async () => {
    const res = await request(app.getHttpServer()).get('/companies');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /companies/:id should return one', async () => {
    const res = await request(app.getHttpServer()).get('/companies/1');
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(1);
  });

  it('POST /companies should create', async () => {
    const res = await request(app.getHttpServer())
      .post('/companies')
      .send({ name: 'New', cuit: '30-123' });
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBe(2);
  });

  it('PATCH /companies/:id should update', async () => {
    const res = await request(app.getHttpServer())
      .patch('/companies/1')
      .send({ name: 'Updated' });
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Updated');
  });

  it('DELETE /companies/:id should delete', async () => {
    const res = await request(app.getHttpServer()).delete('/companies/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: { id: '1' } });
  });
});
