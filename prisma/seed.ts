// filepath: prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const importDir = path.join(__dirname, "seeds-data");

function loadJson(file: string) {
  const filePath = path.join(importDir, file);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

async function main() {
  // ⚡ Ojo con el orden, hay que respetar relaciones (padres primero)

  // Base data (no dependencies)
  const users = loadJson("users.json");
  if (users.length)
    await prisma.user.createMany({ data: users, skipDuplicates: true });

  const countries = loadJson("countries.json");
  if (countries.length)
    await prisma.country.createMany({ data: countries, skipDuplicates: true });

  const provinces = loadJson("provinces.json");
  if (provinces.length)
    await prisma.province.createMany({ data: provinces, skipDuplicates: true });

  const cities = loadJson("cities.json");
  if (cities.length)
    await prisma.city.createMany({ data: cities, skipDuplicates: true });

  const businessCategories = loadJson("businessCategories.json");
  if (businessCategories.length)
    await prisma.businessCategory.createMany({
      data: businessCategories,
      skipDuplicates: true,
    });

  const businessSubCategories = loadJson("businessSubCategories.json");
  if (businessSubCategories.length)
    await prisma.businessSubCategory.createMany({
      data: businessSubCategories,
      skipDuplicates: true,
    });

  const companies = loadJson("companies.json");
  if (companies.length)
    await prisma.company.createMany({ data: companies, skipDuplicates: true });

  const contacts = loadJson("contacts.json");
  if (contacts.length)
    await prisma.contact.createMany({ data: contacts, skipDuplicates: true });

  const contactLinks = loadJson("contactLinks.json");
  if (contactLinks.length)
    await prisma.contactLink.createMany({
      data: contactLinks,
      skipDuplicates: true,
    });

  const addresses = loadJson("addresses.json");
  if (addresses.length)
    await prisma.address.createMany({ data: addresses, skipDuplicates: true });

  const persons = loadJson("persons.json");
  if (persons.length)
    await prisma.person.createMany({ data: persons, skipDuplicates: true });

  const families = loadJson("families.json");
  if (families.length)
    await prisma.family.createMany({ data: families, skipDuplicates: true });

  const employeeCategories = loadJson("employeeCategories.json");
  if (employeeCategories.length)
    await prisma.employeeCategory.createMany({
      data: employeeCategories,
      skipDuplicates: true,
    });

  const employeePositions = loadJson("employeePositions.json");
  if (employeePositions.length)
    await prisma.employeePosition.createMany({
      data: employeePositions,
      skipDuplicates: true,
    });

  const employees = loadJson("employees.json");
  if (employees.length)
    await prisma.employee.createMany({ data: employees, skipDuplicates: true });

  const employeeVacations = loadJson("employeeVacations.json");
  if (employeeVacations.length)
    await prisma.employeeVacation.createMany({
      data: employeeVacations,
      skipDuplicates: true,
    });

  const employeeIncidents = loadJson("employeeIncidents.json");
  if (employeeIncidents.length)
    await prisma.employeeIncident.createMany({
      data: employeeIncidents,
      skipDuplicates: true,
    });

  const documents = loadJson("documents.json");
  if (documents.length)
    await prisma.document.createMany({ data: documents, skipDuplicates: true });

  // Equipment hierarchy
  const equipmentCategories = loadJson("equipmentCategories.json");
  if (equipmentCategories.length)
    await prisma.equipmentCategory.createMany({
      data: equipmentCategories,
      skipDuplicates: true,
    });

  const equipmentTypes = loadJson("equipmentTypes.json");
  if (equipmentTypes.length)
    await prisma.equipmentType.createMany({
      data: equipmentTypes,
      skipDuplicates: true,
    });

  const equipmentModels = loadJson("equipmentModels.json");
  if (equipmentModels.length)
    await prisma.equipmentModel.createMany({
      data: equipmentModels,
      skipDuplicates: true,
    });

  const equipment = loadJson("equipment.json");
  if (equipment.length)
    await prisma.equipment.createMany({
      data: equipment,
      skipDuplicates: true,
    });

  const equipmentMaintenance = loadJson("equipmentMaintenance.json");
  if (equipmentMaintenance.length)
    await prisma.equipmentMaintenance.createMany({
      data: equipmentMaintenance,
      skipDuplicates: true,
    });

  // Inspections
  const inspectionTypes = loadJson("inspectionTypes.json");
  if (inspectionTypes.length)
    await prisma.inspectionType.createMany({
      data: inspectionTypes,
      skipDuplicates: true,
    });

  const inspections = loadJson("inspections.json");
  if (inspections.length)
    await prisma.inspection.createMany({
      data: inspections,
      skipDuplicates: true,
    });

  // Parts system
  const brands = loadJson("brands.json");
  if (brands.length)
    await prisma.brand.createMany({ data: brands, skipDuplicates: true });

  const partCategories = loadJson("partCategories.json");
  if (partCategories.length)
    await prisma.partCategory.createMany({
      data: partCategories,
      skipDuplicates: true,
    });

  const parts = loadJson("parts.json");
  if (parts.length)
    await prisma.part.createMany({ data: parts, skipDuplicates: true });

  const partOrderCompanies = loadJson("partOrderCompanies.json");
  if (partOrderCompanies.length)
    await prisma.partOrderCompany.createMany({
      data: partOrderCompanies,
      skipDuplicates: true,
    });

  const equipmentModelParts = loadJson("equipmentModelParts.json");
  if (equipmentModelParts.length)
    await prisma.equipmentModelPart.createMany({
      data: equipmentModelParts,
      skipDuplicates: true,
    });

  const equipmentParts = loadJson("equipmentParts.json");
  if (equipmentParts.length)
    await prisma.equipmentPart.createMany({
      data: equipmentParts,
      skipDuplicates: true,
    });

  // Products system
  const presentations = loadJson("presentations.json");
  if (presentations.length)
    await prisma.presentation.createMany({
      data: presentations,
      skipDuplicates: true,
    });

  const products = loadJson("products.json");
  if (products.length)
    await prisma.product.createMany({ data: products, skipDuplicates: true });

  const productCompanies = loadJson("productCompanies.json");
  if (productCompanies.length)
    await prisma.productCompany.createMany({
      data: productCompanies,
      skipDuplicates: true,
    });

  // Additional data
  const tires = loadJson("tires.json");
  if (tires.length)
    await prisma.tire.createMany({ data: tires, skipDuplicates: true });

  const units = loadJson("units.json");
  if (units.length)
    await prisma.unit.createMany({ data: units, skipDuplicates: true });

  const historyLogs = loadJson("historyLogs.json");
  if (historyLogs.length)
    await prisma.historyLog.createMany({
      data: historyLogs,
      skipDuplicates: true,
    });

  console.log("🌱 Seed completed successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
