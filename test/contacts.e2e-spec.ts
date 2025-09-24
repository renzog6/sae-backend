// filepath: sae-backend/test/contacts.e2e-spec.ts
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestingApp } from './utils';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Contacts E2E', () => {
  let app: INestApplication;
  const prismaMock: Partial<PrismaService> = {
    contact: {
      findMany: jest.fn().mockResolvedValue([{ id: 1, type: 'EMAIL', value: 'a@b.com' }]),
      count: jest.fn().mockResolvedValue(1),
      findUnique: jest.fn().mockResolvedValue({ id: 1, type: 'EMAIL', value: 'a@b.com' }),
      create: jest.fn().mockResolvedValue({ id: 2, type: 'PHONE', value: '+5491112345678', contactLinks: [] }),
      update: jest.fn().mockResolvedValue({ id: 1, type: 'EMAIL', value: 'updated@b.com' }),
      delete: jest.fn().mockResolvedValue({}),
    },
    contactLink: {
      deleteMany: jest.fn().mockResolvedValue({}),
      create: jest.fn().mockResolvedValue({}),
    },
  } as any;

  beforeAll(async () => {
    const created = await createTestingApp(prismaMock);
    app = created.app;
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /contacts should list contacts (paginated)', async () => {
    const res = await request(app.getHttpServer()).get('/contacts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /contacts/company/:companyId should list contacts by company', async () => {
    // Adjust mock to show filter call if needed
    const res = await request(app.getHttpServer()).get('/contacts/company/10');
    expect(res.status).toBe(200);
    expect(res.body.meta.total).toBeDefined();
  });

  it('GET /contacts/:id should return one', async () => {
    const res = await request(app.getHttpServer()).get('/contacts/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('POST /contacts should create', async () => {
    const res = await request(app.getHttpServer())
      .post('/contacts')
      .send({ type: 'PHONE', value: '+5491112345678' });
    expect(res.status).toBe(201);
    expect(res.body.id).toBe(2);
  });

  it('PATCH /contacts/:id should update', async () => {
    const res = await request(app.getHttpServer())
      .patch('/contacts/1')
      .send({ value: 'updated@b.com', type: 'EMAIL' });
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('DELETE /contacts/:id should delete', async () => {
    const res = await request(app.getHttpServer()).delete('/contacts/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: '1' });
  });
});
