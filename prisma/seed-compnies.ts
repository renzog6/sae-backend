// filepath: sae-backend/prisma/seed-companies.ts
import { PrismaClient } from "@prisma/client";
import businessCategoriesData from "./business_categories.json";
import companiesData from "./companies.json";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed for companies and business categories from JSON...");

  const categories = businessCategoriesData.RECORDS;
  const companies = companiesData.RECORDS;

  console.log(`📂 Found ${categories.length} business categories`);
  for (const category of categories) {
    await prisma.businessCategory.upsert({
      where: { id: Number(category.id) },
      update: {},
      create: {
        id: Number(category.id),
        name: category.name,
        code: category.code || null,
        information: category.information || null,
      },
    });
  }
  console.log("✅ Business categories seeded");
  console.log("---");

  console.log(`📂 Found ${companies.length} companies`);
  for (const company of companies) {
    await prisma.company.upsert({
      where: { id: Number(company.id) },
      update: {},
      create: {
        id: Number(company.id),
        cuit: company.cuit,
        name: company.name,
        businessName: company.businessName,
        information: company.information || null,
        businessCategoryId: company.businessCategoryId
          ? Number(company.businessCategoryId)
          : null,
      },
    });
  }
  console.log("✅ Companies seeded");

  console.log("🎉 Seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });