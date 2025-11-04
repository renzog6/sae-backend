// filepath: sae-backend/test/tire-recaps.e2e-spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";

describe("TireRecaps (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();

    // Login to get access token
    const loginResponse = await request(app.getHttpServer())
      .post("/api/auth/login")
      .send({
        email: "admin@rcmsa.ar",
        password: "password123",
      });

    accessToken = loginResponse.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  describe("/tires/recaps (POST)", () => {
    it("should create a tire recap with new fields", async () => {
      // First create a tire
      const tire = await prisma.tire.create({
        data: {
          serialNumber: "TEST-RECAP-001",
          modelId: 1, // Assuming model exists
        },
      });

      const recapData = {
        tireId: tire.id,
        provider: "Test Vulcanizadora",
        cost: 75000.5,
        notes: "Test recap with new fields",
        kmAtRecap: 65000,
        recapType: "full",
      };

      const response = await request(app.getHttpServer())
        .post("/api/tires/recaps")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(recapData)
        .expect(201);

      expect(response.body).toHaveProperty("id");
      expect(response.body.tireId).toBe(tire.id);
      expect(response.body.provider).toBe(recapData.provider);
      expect(response.body.cost).toBe(recapData.cost);
      expect(response.body.kmAtRecap).toBe(recapData.kmAtRecap);
      expect(response.body.recapType).toBe(recapData.recapType);

      // Verify denormalization in tire
      const updatedTire = await prisma.tire.findUnique({
        where: { id: tire.id },
      });

      expect(updatedTire.recapCount).toBe(1);
      expect(updatedTire.lastRecapId).toBe(response.body.id);
      expect(updatedTire.lastRecapAt).toBeDefined();
      expect(updatedTire.status).toBe("RECAP");

      // Cleanup
      await prisma.tireRecap.delete({ where: { id: response.body.id } });
      await prisma.tire.delete({ where: { id: tire.id } });
    });

    it("should increment recap count on multiple recaps", async () => {
      // Create a tire
      const tire = await prisma.tire.create({
        data: {
          serialNumber: "TEST-RECAP-002",
          modelId: 1,
        },
      });

      // First recap
      const recap1 = await request(app.getHttpServer())
        .post("/api/tires/recaps")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          tireId: tire.id,
          kmAtRecap: 60000,
          recapType: "partial",
        })
        .expect(201);

      // Second recap
      const recap2 = await request(app.getHttpServer())
        .post("/api/tires/recaps")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          tireId: tire.id,
          kmAtRecap: 120000,
          recapType: "full",
        })
        .expect(201);

      // Verify tire denormalization
      const updatedTire = await prisma.tire.findUnique({
        where: { id: tire.id },
      });

      expect(updatedTire.recapCount).toBe(2);
      expect(updatedTire.lastRecapId).toBe(recap2.body.id);

      // Cleanup
      await prisma.tireRecap.delete({ where: { id: recap2.body.id } });
      await prisma.tireRecap.delete({ where: { id: recap1.body.id } });
      await prisma.tire.delete({ where: { id: tire.id } });
    });
  });

  describe("/tires/recaps/tire/:tireId (GET)", () => {
    it("should get recap history for a tire", async () => {
      // Create a tire
      const tire = await prisma.tire.create({
        data: {
          serialNumber: "TEST-RECAP-003",
          modelId: 1,
        },
      });

      // Create recap
      const recap = await prisma.tireRecap.create({
        data: {
          tireId: tire.id,
          kmAtRecap: 70000,
          recapType: "full",
          recapNumber: 1,
        },
      });

      const response = await request(app.getHttpServer())
        .get(`/api/tires/recaps/tire/${tire.id}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].kmAtRecap).toBe(70000);
      expect(response.body[0].recapType).toBe("full");

      // Cleanup
      await prisma.tireRecap.delete({ where: { id: recap.id } });
      await prisma.tire.delete({ where: { id: tire.id } });
    });
  });
});
