// filepath: sae-backend/prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Helper to generate a unique code from a brand name
function toBrandCode(input: string): string {
  return input
    .normalize("NFKD") // split accents from letters
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_") // non-alphanumerics to underscores
    .replace(/^_+|_+$/g, ""); // trim underscores
}

async function main() {
  console.log("Seeding database...");

  // Create countries first
  const countries = [
    { name: "Argentina", isoCode: "AR", code: "ARG" },
    { name: "Brasil", isoCode: "BR", code: "BRA" },
    { name: "Chile", isoCode: "CL", code: "CHL" },
    { name: "Uruguay", isoCode: "UY", code: "URY" },
    { name: "Paraguay", isoCode: "PY", code: "PRY" },
  ];

  const countryMap = new Map();
  for (const country of countries) {
    const createdCountry = await prisma.country.upsert({
      where: { isoCode: country.isoCode },
      update: {},
      create: {
        name: country.name,
        isoCode: country.isoCode,
        code: country.code,
      },
    });
    countryMap.set(country.isoCode, createdCountry.id);
  }
  console.log("Countries created");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin user created:", admin.email);

  // Create business categories
  const categories = [
    { name: "Cliente" },
    { name: "Proveedor" },
    { name: "Taller" },
    { name: "Transportista" },
    { name: "Otro" },
  ];

  for (const category of categories) {
    await prisma.businessCategory.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name,
        subCategories: {
          create: [
            { name: `${category.name} A` },
            { name: `${category.name} B` },
            { name: `${category.name} C` },
          ],
        },
      },
    });
  }
  console.log("Business categories created");

  // Create provinces with country relationship
  const provinces = [
    { id: 1, name: "Buenos Aires", code: "A", countryCode: "AR" },
    { id: 2, name: "Catamarca", code: "K", countryCode: "AR" },
    { id: 3, name: "Chaco", code: "H", countryCode: "AR" },
    { id: 4, name: "Chubut", code: "U", countryCode: "AR" },
    { id: 5, name: "Cordoba", code: "X", countryCode: "AR" },
    { id: 6, name: "Corrientes", code: "W", countryCode: "AR" },
    { id: 7, name: "Entre Rios", code: "E", countryCode: "AR" },
    { id: 8, name: "Formosa", code: "P", countryCode: "AR" },
    { id: 9, name: "Jujuy", code: "Y", countryCode: "AR" },
    { id: 10, name: "La Pampa", code: "L", countryCode: "AR" },
    { id: 11, name: "La Rioja", code: "F", countryCode: "AR" },
    { id: 12, name: "Mendoza", code: "M", countryCode: "AR" },
    { id: 13, name: "Misiones", code: "N", countryCode: "AR" },
    { id: 14, name: "Neuquen", code: "Q", countryCode: "AR" },
    { id: 15, name: "Rio Negro", code: "R", countryCode: "AR" },
    { id: 16, name: "Salta", code: "A", countryCode: "AR" },
    { id: 17, name: "San Juan", code: "J", countryCode: "AR" },
    { id: 18, name: "San Luis", code: "D", countryCode: "AR" },
    { id: 19, name: "Santa Cruz", code: "Z", countryCode: "AR" },
    { id: 20, name: "Santa Fe", code: "S", countryCode: "AR" },
    { id: 21, name: "Santiago del Estero", code: "G", countryCode: "AR" },
    { id: 22, name: "Tierra de Fuego", code: "V", countryCode: "AR" },
    { id: 23, name: "Tucuman", code: "T", countryCode: "AR" },
    {
      id: 24,
      name: "Ciudad Autonoma de Buenos Aires",
      code: "C",
      countryCode: "AR",
    },
    { id: 100, name: "Desconocida", code: "-", countryCode: "AR" },
  ];

  const provinceMap = new Map();
  for (const province of provinces) {
    const countryId = countryMap.get("AR");
    if (countryId) {
      const createdProvince = await prisma.province.upsert({
        where: { code: province.code },
        update: {},
        create: {
          name: province.name,
          code: province.code,
          countryId: countryId,
        },
      });
      provinceMap.set(province.id, createdProvince.id);
    }
  }
  console.log("Provinces created");

  // Create brands
  const brands = [
    "A. Vetre", "Agrometal", "Aiello", "AKRON", "Baimo", "BEC-CAR", "Belen", "Budassi", "Bustinza", "CAFIRO",
    "CAT", "Ceruti", "Conese", "CORVEN", "Crucianelli", "Dolzani", "Dupper", "El Fierro", "Falito", "Genovese",
    "Gentilli", "Grosspal", "Honda", "John Deere", "Mainero", "Marcelini", "Massey Ferguson", "Mauro", "Metalfor",
    "Moducar", "MS", "Musillo", "OMBU", "Plastrong", "PPG", "Scania", "Sola y Brusa", "TBeH", "Toyota", "TRAIMAX",
    "Zanello", "Alliance", "BKT", "Protto", "Donaldson", "Mobil", "Ford"
  ];

  for (const brandName of brands) {
    const code = toBrandCode(brandName);
    await prisma.brand.upsert({
      where: { code },
      update: {},
      create: { name: brandName, code, isActive: true },
    });
  }
  console.log("Brands created");

  // Create units (generales y agrícolas)
  const units = [
    { name: "Kilogramo", abbreviation: "kg" },
    { name: "Gramo", abbreviation: "g" },
    { name: "Tonelada", abbreviation: "t" },
    { name: "Quintal", abbreviation: "qq" },
    { name: "Litro", abbreviation: "l" },
    { name: "Metro", abbreviation: "m" },
    { name: "Centímetro", abbreviation: "cm" },
    { name: "Milímetro", abbreviation: "mm" },
    { name: "Unidad", abbreviation: "u" },
    { name: "Hora", abbreviation: "h" },
    { name: "Hectárea", abbreviation: "ha" },
    { name: "Metro cúbico", abbreviation: "m³" },
  ];

  for (const unit of units) {
    await prisma.unit.upsert({
      where: { abbreviation: unit.abbreviation },
      update: {},
      create: {
        name: unit.name,
        abbreviation: unit.abbreviation,
      },
    });
  }
  console.log("Units created");

  console.log("Database seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
