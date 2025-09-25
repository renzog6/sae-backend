// filepath: sae-backend/test/locations-cities.e2e-spec.ts
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestingApp } from './utils';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Locations - Cities E2E', () => {
  let app: INestApplication;
  const prismaMock: Partial<PrismaService> = {
    city: {
      findMany: jest.fn().mockResolvedValue([{ id: 1, name: 'City', provinceId: 1 }]),
      findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'City', provinceId: 1 }),
      create: jest.fn().mockResolvedValue({ id: 2, name: 'New City', provinceId: 1 }),
      update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated City', provinceId: 1 }),
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

  it('GET /locations/cities should list', async () => {
    const res = await request(app.getHttpServer()).get('/locations/cities');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /locations/cities/:id should get one', async () => {
    const res = await request(app.getHttpServer()).get('/locations/cities/1');
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(1);
  });

  it('POST /locations/cities should create', async () => {
    const res = await request(app.getHttpServer())
      .post('/locations/cities')
      .send({ name: 'New City', postalCode: '1000', provinceId: 1 });
    expect(res.status).toBe(201);
    expect(res.body.data.id).toBe(2);
  });

  it('PATCH /locations/cities/:id should update', async () => {
    const res = await request(app.getHttpServer())
      .patch('/locations/cities/1')
      .send({ name: 'Updated City' });
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Updated City');
  });

  it('DELETE /locations/cities/:id should delete', async () => {
    const res = await request(app.getHttpServer()).delete('/locations/cities/1');
    expect(res.status).toBe(200);
  });

  it('GET /locations/cities/province/:provinceId should list by province', async () => {
    (prismaMock.city!.findMany as jest.Mock).mockResolvedValueOnce([{ id: 3, name: 'X', provinceId: 9 }]);
    const res = await request(app.getHttpServer()).get('/locations/cities/province/9');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /locations/cities/postal-code/:postalCode should find by postal code', async () => {
    (prismaMock.city!.findFirst as any) = jest.fn().mockResolvedValueOnce({ id: 7, name: 'PC', postalCode: 'AB' });
    const res = await request(app.getHttpServer()).get('/locations/cities/postal-code/AB');
    expect(res.status).toBe(200);
  });
});
