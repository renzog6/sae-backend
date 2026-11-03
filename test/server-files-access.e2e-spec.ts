// filepath: sae-backend/test/server-files-access.e2e-spec.ts
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import { createTestingApp } from './utils';

/**
 * Cierra el IDOR de /server-files/:id/download (P0-2).
 *
 * Distinción clave: 403 = la autorización rechazó; 404 = la autorización pasó
 * pero el archivo no existe en disco (el mock no crea archivos reales).
 */
describe('server-files: control de acceso', () => {
  let app: INestApplication;
  let secret: string;

  const userCompany1UserRole = {
    id: 10,
    email: 'user@empresa1.com',
    name: 'User',
    role: 'USER',
    companyId: 1,
    isActive: true,
    deletedAt: null,
  };
  const userCompany2UserRole = { ...userCompany1UserRole, id: 11, companyId: 2 };
  const adminUser = { ...userCompany1UserRole, id: 12, role: 'ADMIN' };

  let currentSessionUser: typeof userCompany1UserRole = userCompany1UserRole;

  const prismaMock = {
    user: {
      findUnique: jest.fn(async () => currentSessionUser),
      findFirst: jest.fn(async () => currentSessionUser),
    },
    employee: {
      findUnique: jest.fn(async () => ({ companyId: 2 })),
    },
    serverFile: {
      // archivo de la empresa 2
      findUniqueOrThrow: jest.fn(async () => ({
        id: 99,
        filename: 'legajo.pdf',
        mimetype: 'application/pdf',
        size: 123,
        path: 'storage/uploads/nonexistent/legajo.pdf',
        companyId: 2,
        employeeId: null,
        isActive: true,
        deletedAt: null,
      })),
      findMany: jest.fn(async () => []),
    },
  };

  const tokenFor = (user: { id: number }) =>
    jwt.sign({ sub: user.id, email: 'x@x.com', role: 'USER' }, secret, {
      expiresIn: '5m',
    });

  beforeAll(async () => {
    ({ app } = await createTestingApp(prismaMock as any, {
      allowAllGuards: false,
    }));
    secret = app.get(ConfigService).get<string>('JWT_SECRET') as string;
  });

  afterAll(async () => {
    await app.close();
  });

  it('USUARIO de otra empresa recibe 403', async () => {
    // el archivo pertenece a la empresa 2; el usuario es de la empresa 1
    currentSessionUser = { ...userCompany1UserRole, companyId: 1 } as any;
    const res = await request(app.getHttpServer())
      .get('/server-files/99/download')
      .set('Authorization', `Bearer ${tokenFor(userCompany1UserRole)}`);
    expect(res.status).toBe(403);
  });

  it('USUARIO de la misma empresa pasa la autorización (404 por archivo inexistente)', async () => {
    currentSessionUser = { ...userCompany2UserRole, companyId: 2 } as any;
    const res = await request(app.getHttpServer())
      .get('/server-files/99/download')
      .set('Authorization', `Bearer ${tokenFor(userCompany2UserRole)}`);
    expect(res.status).toBe(404);
  });

  it('ADMIN accede a cualquier archivo (404 por archivo inexistente)', async () => {
    currentSessionUser = adminUser as any;
    const res = await request(app.getHttpServer())
      .get('/server-files/99/download')
      .set('Authorization', `Bearer ${tokenFor(adminUser)}`);
    expect(res.status).toBe(404);
  });

  it('sin token devuelve 401', async () => {
    const res = await request(app.getHttpServer()).get(
      '/server-files/99/download',
    );
    expect(res.status).toBe(401);
  });
describe("validación de tipo MIME y extensiones en upload (P0-3)", () => {
    it("rechaza archivos ejecutables o con extensiones no permitidas (.exe)", async () => {
      const res = await request(app.getHttpServer())
        .post("/server-files/upload")
        .set("Authorization", `Bearer ${tokenFor(userCompany1UserRole)}`)
        .field("entityType", "COMPANY")
        .field("entityId", 1)
        .attach("file", Buffer.from("malicious payload"), "exploit.exe");

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/Tipo de archivo no permitido/i);
    });

    it("rechaza uploads sin archivo", async () => {
      const res = await request(app.getHttpServer())
        .post("/server-files/upload")
        .set("Authorization", `Bearer ${tokenFor(userCompany1UserRole)}`)
        .field("entityType", "COMPANY")
        .field("entityId", 1);

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/El archivo es obligatorio/i);
    });
  });
});
