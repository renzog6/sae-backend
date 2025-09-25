// filepath: sae-backend/test/locations-addresses.e2e-spec.ts
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestingApp } from './utils';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Locations - Addresses E2E', () => {
  let app: INestApplication;
  const prismaMock: Partial<PrismaService> = {
    address: {
      findMany: jest.fn().mockResolvedValue([{ id: 1, cityId: 2 }]),
      findUnique: jest.fn().mockResolvedValue({ id: 1, cityId: 2 }),
      create: jest.fn().mockResolvedValue({ id: 2, cityId: 3 }),
      update: jest.fn().mockResolvedValue({ id: 1, cityId: 4 }),
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

  it('GET /locations/addresses should list addresses', async () => {
    const res = await request(app.getHttpServer()).get('/locations/addresses');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /locations/addresses/:id should return one', async () => {
    const res = await request(app.getHttpServer()).get('/locations/addresses/1');
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(1);
  });

  it('POST /locations/addresses should create', async () => {
    const res = await request(app.getHttpServer())
      .post('/locations/addresses')
      .send({ cityId: 3 });
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBe(2);
  });

  it('PATCH /locations/addresses/:id should update', async () => {
    const res = await request(app.getHttpServer())
      .patch('/locations/addresses/1')
      .send({ cityId: 4 });
    expect(res.status).toBe(200);
    expect(res.body.data.cityId).toBe(4);
  });

  it('DELETE /locations/addresses/:id should delete', async () => {
    const res = await request(app.getHttpServer()).delete('/locations/addresses/1');
    expect(res.status).toBe(200);
  });

  it('GET /locations/addresses/city/:cityId should list by city', async () => {
    (prismaMock.address!.findMany as jest.Mock).mockResolvedValueOnce([{ id: 5, cityId: 9 }]);
    const res = await request(app.getHttpServer()).get('/locations/addresses/city/9');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /locations/addresses/company/:companyId should list by company', async () => {
    (prismaMock.address!.findMany as jest.Mock).mockResolvedValueOnce([{ id: 6, companyId: 11 }]);
    const res = await request(app.getHttpServer()).get('/locations/addresses/company/11');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
