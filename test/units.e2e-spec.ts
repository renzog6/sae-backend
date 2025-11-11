// filepath: sae-backend/test/units.e2e-spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { PrismaService } from "../src/prisma/prisma.service";
import { AppModule } from "../src/app.module";
import * as request from "supertest";

describe("Units (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);

    // Clean up the database before tests
    await prisma.unit.deleteMany({});
  });

  afterAll(async () => {
    await prisma.unit.deleteMany({});
    await app.close();
  });

  describe("POST /units", () => {
    it("should create a unit", async () => {
      const createUnitDto = {
        name: "Kilogram",
        abbreviation: "kg",
      };

      const response = await request(app.getHttpServer())
        .post("/units")
        .send(createUnitDto)
        .expect(201);

      expect(response.body.data).toMatchObject({
        name: "Kilogram",
        abbreviation: "kg",
        isActive: true,
        deletedAt: null,
      });
    });
  });

  describe("GET /units", () => {
    it("should return all units", async () => {
      // Create test units
      await prisma.unit.create({
        data: {
          name: "Kilogram",
          abbreviation: "kg",
        },
      });
      await prisma.unit.create({
        data: {
          name: "Meter",
          abbreviation: "m",
        },
      });

      const response = await request(app.getHttpServer())
        .get("/units")
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      expect(response.body.meta).toMatchObject({
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
    });

    it("should filter units with search query", async () => {
      const response = await request(app.getHttpServer())
        .get("/units?q=kilo")
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe("Kilogram");
    });
  });

  describe("GET /units/:id", () => {
    it("should return a unit by id", async () => {
      const createdUnit = await prisma.unit.create({
        data: {
          name: "Liter",
          abbreviation: "l",
        },
      });

      const response = await request(app.getHttpServer())
        .get(`/units/${createdUnit.id}`)
        .expect(200);

      expect(response.body.data).toMatchObject({
        id: createdUnit.id,
        name: "Liter",
        abbreviation: "l",
      });
    });

    it("should return 404 for non-existent unit", async () => {
      await request(app.getHttpServer()).get("/units/99999").expect(404);
    });
  });

  describe("PATCH /units/:id", () => {
    it("should update a unit", async () => {
      const createdUnit = await prisma.unit.create({
        data: {
          name: "Second",
          abbreviation: "s",
        },
      });

      const updateUnitDto = {
        name: "Updated Second",
      };

      const response = await request(app.getHttpServer())
        .patch(`/units/${createdUnit.id}`)
        .send(updateUnitDto)
        .expect(200);

      expect(response.body.data).toMatchObject({
        id: createdUnit.id,
        name: "Updated Second",
        abbreviation: "s",
      });
    });
  });

  describe("DELETE /units/:id", () => {
    it("should soft delete a unit", async () => {
      const createdUnit = await prisma.unit.create({
        data: {
          name: "Ampere",
          abbreviation: "A",
        },
      });

      const response = await request(app.getHttpServer())
        .delete(`/units/${createdUnit.id}`)
        .expect(200);

      expect(response.body.data).toBe("Unit deleted");

      // Verify the unit is soft deleted
      const deletedUnit = await prisma.unit.findUnique({
        where: { id: createdUnit.id },
      });

      expect(deletedUnit?.isActive).toBe(false);
      expect(deletedUnit?.deletedAt).toBeTruthy();
    });
  });

  describe("PATCH /units/:id/restore", () => {
    it("should restore a soft-deleted unit", async () => {
      const createdUnit = await prisma.unit.create({
        data: {
          name: "Kelvin",
          abbreviation: "K",
        },
      });

      // Soft delete the unit
      await prisma.unit.update({
        where: { id: createdUnit.id },
        data: {
          isActive: false,
          deletedAt: new Date(),
        },
      });

      const response = await request(app.getHttpServer())
        .patch(`/units/${createdUnit.id}/restore`)
        .expect(200);

      expect(response.body.data.id).toBe(createdUnit.id);

      // Verify the unit is restored
      const restoredUnit = await prisma.unit.findUnique({
        where: { id: createdUnit.id },
      });

      expect(restoredUnit?.isActive).toBe(true);
      expect(restoredUnit?.deletedAt).toBeNull();
    });
  });
});
