// filepath: sae-backend/test/locations-provinces.e2e-spec.ts
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestingApp } from './utils';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Locations - Provinces E2E', () => {
  let app: INestApplication;
  const prismaMock: Partial<PrismaService> = {
    province: {
      findMany: jest.fn().mockResolvedValue([{ id: 1, name: 'P', code: 'P', countryId: 1 }]),
      findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'P', code: 'P', countryId: 1 }),
      create: jest.fn().mockResolvedValue({ id: 2, name: 'New P', code: 'NP', countryId: 1 }),
      update: jest.fn().mockResolvedValue({ id: 1, name: 'Upd P', code: 'P', countryId: 1 }),
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

  it('GET /locations/provinces/country/:countryId should list by country', async () => {
    const res = await request(app.getHttpServer()).get('/locations/provinces/country/3');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /locations/provinces/:id should get one', async () => {
    const res = await request(app.getHttpServer()).get('/locations/provinces/1');
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(1);
  });

  it('POST /locations/provinces should create', async () => {
    const res = await request(app.getHttpServer())
      .post('/locations/provinces')
      .send({ name: 'New P', code: 'NP', countryId: 1 });
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBe(2);
  });

  it('PATCH /locations/provinces/:id should update', async () => {
    const res = await request(app.getHttpServer())
      .patch('/locations/provinces/1')
      .send({ name: 'Upd P' });
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Upd P');
  });

  it('DELETE /locations/provinces/:id should delete', async () => {
    const res = await request(app.getHttpServer()).delete('/locations/provinces/1');
    expect(res.status).toBe(200);
  });

  it('GET /locations/provinces/code/:code should find by code', async () => {
    (prismaMock.province!.findUnique as jest.Mock).mockResolvedValueOnce({ id: 7, code: 'XX' });
    const res = await request(app.getHttpServer()).get('/locations/provinces/code/XX');
    expect(res.status).toBe(200);
  });

  it('GET /locations/provinces/country/:countryId should list by country', async () => {
    (prismaMock.province!.findMany as jest.Mock).mockResolvedValueOnce([{ id: 9, countryId: 3 }]);
    const res = await request(app.getHttpServer()).get('/locations/provinces/country/3');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
