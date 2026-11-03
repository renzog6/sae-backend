// filepath: sae-backend/test/auth-guard.e2e-spec.ts
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestingApp } from './utils';

/**
 * Verifica la cadena real de autenticación (sin el AllowAllGuard que usan
 * las demás suites). Es la cobertura que faltaba: antes de registrar los
 * guards globales, un endpoint sin `@UseGuards` respondía 200 sin token.
 */
describe('Autenticación global', () => {
  let app: INestApplication;

  beforeAll(async () => {
    ({ app } = await createTestingApp({}, { allowAllGuards: false }));
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /health es público', async () => {
    const res = await request(app.getHttpServer()).get('/health');
    expect(res.status).toBe(200);
  });

  it('GET /companies sin token devuelve 401', async () => {
    const res = await request(app.getHttpServer()).get('/companies');
    expect(res.status).toBe(401);
  });

  it('GET /tires/assignments/open sin token devuelve 401', async () => {
    const res = await request(app.getHttpServer()).get(
      '/tires/assignments/open',
    );
    expect(res.status).toBe(401);
  });

  it('GET /server-files sin token devuelve 401', async () => {
    const res = await request(app.getHttpServer()).get('/server-files');
    expect(res.status).toBe(401);
  });

  it('GET /companies con token inválido devuelve 401', async () => {
    const res = await request(app.getHttpServer())
      .get('/companies')
      .set('Authorization', 'Bearer token-invalido');
    expect(res.status).toBe(401);
  });
});
