// filepath: sae-backend/test/smoke-api.e2e-spec.ts
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestingApp } from './utils';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Smoke E2E: Flujos Críticos de la API', () => {
  let app: INestApplication;

  const mockCompany = {
    id: 1,
    name: 'Empresa Demo SAE',
    cuit: '30-12345678-9',
    isActive: true,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockEmployee = {
    id: 1,
    companyId: 1,
    personId: 10,
    isActive: true,
    deletedAt: null,
    person: {
      id: 10,
      firstName: 'Juan',
      lastName: 'Pérez',
      dni: '30123456',
    },
  };

  const prismaMock: Partial<PrismaService> = {
    company: {
      findMany: jest.fn().mockResolvedValue([mockCompany]),
      count: jest.fn().mockResolvedValue(1),
      findUnique: jest.fn().mockResolvedValue(mockCompany),
      create: jest.fn().mockResolvedValue({ ...mockCompany, id: 2, name: 'Nueva Empresa' }),
      update: jest.fn().mockResolvedValue({ ...mockCompany, name: 'Empresa Actualizada' }),
      delete: jest.fn().mockResolvedValue({}),
    },
    employee: {
      findMany: jest.fn().mockResolvedValue([mockEmployee]),
      count: jest.fn().mockResolvedValue(1),
      findUnique: jest.fn().mockResolvedValue(mockEmployee),
    },
  } as any;

  beforeAll(async () => {
    const created = await createTestingApp(prismaMock, { allowAllGuards: true });
    app = created.app;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Health Check', () => {
    it('GET /health responde 200 con estado ok', async () => {
      const res = await request(app.getHttpServer()).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });

  describe('Empresas (CRUD)', () => {
    it('GET /companies lista empresas con paginación', async () => {
      const res = await request(app.getHttpServer()).get('/companies');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.meta).toBeDefined();
    });

    it('GET /companies/:id obtiene el detalle de una empresa', async () => {
      const res = await request(app.getHttpServer()).get('/companies/1');
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(1);
      expect(res.body.data.name).toBe('Empresa Demo SAE');
    });

    it('POST /companies crea una nueva empresa', async () => {
      const res = await request(app.getHttpServer())
        .post('/companies')
        .send({ name: 'Nueva Empresa', cuit: '30-98765432-1' });
      expect(res.status).toBe(201);
      expect(res.body.data.id).toBe(2);
    });

    it('PUT /companies/:id actualiza los datos de una empresa', async () => {
      const res = await request(app.getHttpServer())
        .put('/companies/1')
        .send({ name: 'Empresa Actualizada' });
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe('Empresa Actualizada');
    });

    it('DELETE /companies/:id elimina una empresa', async () => {
      const res = await request(app.getHttpServer()).delete('/companies/1');
      expect(res.status).toBe(200);
      expect(res.body.data).toBeDefined();
    });
  });

  describe('Empleados', () => {
    it('GET /employees lista empleados paginados', async () => {
      const res = await request(app.getHttpServer()).get('/employees');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(1);
    });

    it('GET /employees/:id obtiene el detalle de un empleado', async () => {
      const res = await request(app.getHttpServer()).get('/employees/1');
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(1);
    });
  });
});
