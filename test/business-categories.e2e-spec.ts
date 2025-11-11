// filepath: sae-backend/test/business-categories.e2e-spec.ts
import * as request from "supertest";
import { INestApplication } from "@nestjs/common";
import { createTestingApp } from "./utils";
import { PrismaService } from "../src/prisma/prisma.service";

describe("Business Categories E2E", () => {
  let app: INestApplication;

  const mockCategories = [
    {
      id: 1,
      name: "Construction",
      code: "CONST",
      information: "Construction companies",
      isActive: true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      subCategories: [],
    },
    {
      id: 2,
      name: "Agriculture",
      code: "AGR",
      information: "Agricultural companies",
      isActive: true,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      subCategories: [],
    },
  ];

  const prismaMock: Partial<PrismaService> = {
    businessCategory: {
      findMany: jest.fn().mockResolvedValue(mockCategories),
      count: jest.fn().mockResolvedValue(2),
      findFirst: jest.fn().mockResolvedValue(mockCategories[0]),
      findUnique: jest.fn().mockResolvedValue(mockCategories[0]),
      create: jest.fn().mockResolvedValue({
        id: 3,
        name: "Manufacturing",
        code: "MANUF",
        information: "Manufacturing companies",
        isActive: true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        subCategories: [],
      }),
      update: jest.fn().mockResolvedValue({
        ...mockCategories[0],
        name: "Updated Category",
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

  it("GET /business-categories should list categories", async () => {
    const res = await request(app.getHttpServer()).get("/business-categories");
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(2);
    expect(res.body.meta).toBeDefined();
  });

  it("GET /business-categories with search query should filter categories", async () => {
    const res = await request(app.getHttpServer())
      .get("/business-categories")
      .query({ q: "Construction" });
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  it("GET /business-categories/:id should return one category", async () => {
    const res = await request(app.getHttpServer()).get(
      "/business-categories/1"
    );
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.id).toBe(1);
    expect(res.body.data.name).toBe("Construction");
  });

  it("POST /business-categories should create a new category", async () => {
    const newCategory = {
      name: "Manufacturing",
      code: "MANUF",
      information: "Manufacturing companies",
    };

    const res = await request(app.getHttpServer())
      .post("/business-categories")
      .send(newCategory);

    expect(res.status).toBe(201);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.id).toBe(3);
    expect(res.body.data.name).toBe("Manufacturing");
  });

  it("PATCH /business-categories/:id should update a category", async () => {
    const updateData = {
      name: "Updated Category",
      information: "Updated information",
    };

    const res = await request(app.getHttpServer())
      .patch("/business-categories/1")
      .send(updateData);

    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.name).toBe("Updated Category");
  });

  it("DELETE /business-categories/:id should soft delete a category", async () => {
    const res = await request(app.getHttpServer()).delete(
      "/business-categories/1"
    );
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  it("PATCH /business-categories/:id/restore should restore a soft-deleted category", async () => {
    const res = await request(app.getHttpServer()).patch(
      "/business-categories/1/restore"
    );
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  it("GET /business-categories with pagination should return paginated results", async () => {
    const res = await request(app.getHttpServer())
      .get("/business-categories")
      .query({ page: 1, limit: 1 });

    expect(res.status).toBe(200);
    expect(res.body.meta).toBeDefined();
    expect(res.body.meta.page).toBe(1);
    expect(res.body.meta.limit).toBe(1);
  });
});
