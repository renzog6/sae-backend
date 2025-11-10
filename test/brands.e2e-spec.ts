// filepath: sae-backend/test/brands.e2e-spec.ts
import * as request from "supertest";
import { INestApplication } from "@nestjs/common";
import { createTestingApp } from "./utils";
import { PrismaService } from "../src/prisma/prisma.service";

describe("Brands E2E", () => {
  let app: INestApplication;

  const mockBrands = [
    {
      id: 1,
      name: "ACME Tires",
      code: "ACME",
      information: "Premium tire manufacturer",
      isActive: true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Michelin",
      code: "MICH",
      information: "French tire company",
      isActive: true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const prismaMock: Partial<PrismaService> = {
    brand: {
      findMany: jest.fn().mockResolvedValue(mockBrands),
      count: jest.fn().mockResolvedValue(2),
      findFirst: jest.fn().mockResolvedValue(mockBrands[0]),
      findUnique: jest.fn().mockResolvedValue(mockBrands[0]),
      create: jest.fn().mockResolvedValue({
        id: 3,
        name: "Bridgestone",
        code: "BRID",
        information: "Japanese tire manufacturer",
        isActive: true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      update: jest.fn().mockResolvedValue({
        ...mockBrands[0],
        name: "Updated Brand",
      }),
    },
  } as any;

  beforeAll(async () => {
    const created = await createTestingApp(prismaMock);
    app = created.app;
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /brands should list brands", async () => {
    const res = await request(app.getHttpServer()).get("/brands");
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(2);
    expect(res.body.meta).toBeDefined();
  });

  it("GET /brands with search query should filter brands", async () => {
    const res = await request(app.getHttpServer())
      .get("/brands")
      .query({ q: "ACME" });
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  it("GET /brands/:id should return one brand", async () => {
    const res = await request(app.getHttpServer()).get("/brands/1");
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.id).toBe(1);
    expect(res.body.data.name).toBe("ACME Tires");
  });

  it("POST /brands should create a new brand", async () => {
    const newBrand = {
      name: "Bridgestone",
      code: "BRID",
      information: "Japanese tire manufacturer",
    };

    const res = await request(app.getHttpServer())
      .post("/brands")
      .send(newBrand);

    expect(res.status).toBe(201);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.id).toBe(3);
    expect(res.body.data.name).toBe("Bridgestone");
  });

  it("PATCH /brands/:id should update a brand", async () => {
    const updateData = {
      name: "Updated Brand",
      information: "Updated information",
    };

    const res = await request(app.getHttpServer())
      .patch("/brands/1")
      .send(updateData);

    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.name).toBe("Updated Brand");
  });

  it("DELETE /brands/:id should soft delete a brand", async () => {
    const res = await request(app.getHttpServer()).delete("/brands/1");
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  it("PATCH /brands/:id/restore should restore a soft-deleted brand", async () => {
    const res = await request(app.getHttpServer()).patch("/brands/1/restore");
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  it("GET /brands with pagination should return paginated results", async () => {
    const res = await request(app.getHttpServer())
      .get("/brands")
      .query({ page: 1, limit: 1 });

    expect(res.status).toBe(200);
    expect(res.body.meta).toBeDefined();
    expect(res.body.meta.page).toBe(1);
    expect(res.body.meta.limit).toBe(1);
  });
});
