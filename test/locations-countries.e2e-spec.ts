// filepath: sae-backend/test/locations-countries.e2e-spec.ts
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestingApp } from './utils';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Locations - Countries E2E', () => {
  let app: INestApplication;
  const prismaMock: Partial<PrismaService> = {
    country: {
      findMany: jest.fn().mockResolvedValue([{ id: 1, name: 'AR', code: 'AR' }]),
      findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'AR', code: 'AR' }),
      create: jest.fn().mockResolvedValue({ id: 2, name: 'UY', code: 'UY' }),
      update: jest.fn().mockResolvedValue({ id: 1, name: 'ARG', code: 'AR' }),
      delete: jest.fn().mockResolvedValue({}),
    },
    province: {
      findMany: jest.fn().mockResolvedValue([{ id: 10, name: 'Buenos Aires', countryId: 1 }]),
    },
  } as any;

  beforeAll(async () => {
    const created = await createTestingApp(prismaMock);
    app = created.app;
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /locations/countries should list', async () => {
    const res = await request(app.getHttpServer()).get('/locations/countries');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /locations/countries/:id should get one', async () => {
    const res = await request(app.getHttpServer()).get('/locations/countries/1');
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(1);
  });

  it('POST /locations/countries should create', async () => {
    const res = await request(app.getHttpServer())
      .post('/locations/countries')
      .send({ name: 'UY', code: 'UY' });
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBe(2);
  });

  it('PATCH /locations/countries/:id should update', async () => {
    const res = await request(app.getHttpServer())
      .patch('/locations/countries/1')
      .send({ name: 'ARG' });
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('ARG');
  });

  it('DELETE /locations/countries/:id should delete', async () => {
    const res = await request(app.getHttpServer()).delete('/locations/countries/1');
    expect(res.status).toBe(200);
  });

  it('GET /locations/countries/:id/provinces should list provinces of a country', async () => {
    const res = await request(app.getHttpServer()).get('/locations/countries/1/provinces');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
