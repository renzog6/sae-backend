// filepath: prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const importDir = path.join(__dirname, "seeds-data");

const isDevReset = process.env.SEED_RESET === "true";
const isProd = process.env.NODE_ENV === "production";

function loadJson<T = any>(file: string): T[] {
  const filePath = path.join(importDir, file);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

async function safeCreateMany<T>(
  label: string,
  data: T[],
  createMany: (data: T[]) => Promise<any>,
  createOne?: (item: T) => Promise<any>
) {
  if (!data.length) return;

  try {
    await createMany(data);
    console.log(`✅ ${label}: ${data.length}`);
  } catch (err) {
    console.error(`❌ ${label} failed`);
    if (!createOne) throw err;

    for (const item of data) {
      try {
        await createOne(item);
      } catch (e) {
        console.error(`💥 ${label} item error:`, item);
        throw e;
      }
    }
  }
}

async function resetDevData() {
  if (isProd) {
    throw new Error("❌ SEED_RESET no está permitido en producción");
  }

  console.log("🔥 DEV RESET: borrando datos...");

  await prisma.$transaction([
    prisma.inspection.deleteMany(),
    prisma.employeeIncident.deleteMany(),
    prisma.historyLog.deleteMany(),

    prisma.employeeVacation.deleteMany(),
    prisma.serverFile.deleteMany(),

    prisma.employee.deleteMany(),
    prisma.person.deleteMany(),
  ]);
}

async function main() {
  console.log("🌱 Starting seed...");

  if (isDevReset) {
    await resetDevData();
  }

  // ───────────── GEO ─────────────
  await safeCreateMany(
    "Countries",
    loadJson("countries.json"),
    (data) => prisma.country.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Provinces",
    loadJson("provinces.json"),
    (data) => prisma.province.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Cities",
    loadJson("cities.json"),
    (data) => prisma.city.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Addresses",
    loadJson("addresses.json"),
    (data) => prisma.address.createMany({ data, skipDuplicates: true })
  );

  // ───────────── USERS / PEOPLE ─────────────
  await safeCreateMany(
    "Users",
    loadJson("users.json"),
    (data) => prisma.user.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Persons",
    loadJson("persons.json"),
    (data) => prisma.person.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Families",
    loadJson("families.json"),
    (data) => prisma.family.createMany({ data, skipDuplicates: true })
  );

  // ───────────── COMPANIES ─────────────
  await safeCreateMany(
    "Business Categories",
    loadJson("businessCategories.json"),
    (data) => prisma.businessCategory.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Business SubCategories",
    loadJson("businessSubCategories.json"),
    (data) =>
      prisma.businessSubCategory.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Companies",
    loadJson("companies.json"),
    (data) => prisma.company.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Contacts",
    loadJson("contacts.json"),
    (data) => prisma.contact.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Contact Links",
    loadJson("contactLinks.json"),
    (data) => prisma.contactLink.createMany({ data, skipDuplicates: true })
  );

  // ───────────── HR ─────────────
  await safeCreateMany(
    "Employee Categories",
    loadJson("employeeCategories.json"),
    (data) =>
      prisma.employeeCategory.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Employee Positions",
    loadJson("employeePositions.json"),
    (data) =>
      prisma.employeePosition.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Employees",
    loadJson("employees.json"),
    (data) => prisma.employee.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Employee Vacations",
    loadJson("employeeVacations.json"),
    (data) =>
      prisma.employeeVacation.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Employee Incidents",
    loadJson("employeeIncidents.json"),
    (data) =>
      prisma.employeeIncident.createMany({ data, skipDuplicates: true })
  );

  // ───────────── EQUIPMENT ─────────────
  await safeCreateMany(
    "Brands",
    loadJson("brands.json"),
    (data) => prisma.brand.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Equipment Categories",
    loadJson("equipmentCategories.json"),
    (data) =>
      prisma.equipmentCategory.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Equipment Types",
    loadJson("equipmentTypes.json"),
    (data) =>
      prisma.equipmentType.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Equipment Models",
    loadJson("equipmentModels.json"),
    (data) =>
      prisma.equipmentModel.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Equipment",
    loadJson("equipment.json"),
    (data) => prisma.equipment.createMany({ data, skipDuplicates: true }),
    (item) => prisma.equipment.create({ data: item })
  );

  // ───────────── INSPECTIONS / AUDIT ─────────────
  await safeCreateMany(
    "Inspection Types",
    loadJson("inspectionTypes.json"),
    (data) =>
      prisma.inspectionType.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "Inspections",
    loadJson("inspections.json"),
    (data) => prisma.inspection.createMany({ data, skipDuplicates: true })
  );

  await safeCreateMany(
    "History Logs",
    loadJson("historyLogs.json"),
    (data) => prisma.historyLog.createMany({ data, skipDuplicates: true })
  );

  console.log("🌱 Seed completed successfully");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("💥 Seed failed:", e);
    prisma.$disconnect();
    process.exit(1);
  });
