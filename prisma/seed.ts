import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

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

  // Create cities
  const cities = [
    { id: 1, name: "Desconocida", postalCode: "9999", provinceId: 100 },
    { id: 2, name: "9 De Julio", postalCode: "6500", provinceId: 1 },
    { id: 3, name: "Alcorta", postalCode: "2117", provinceId: 20 },
    { id: 4, name: "Arequito", postalCode: "2183", provinceId: 20 },
    { id: 5, name: "Arias", postalCode: "2624", provinceId: 5 },
    { id: 6, name: "Armstrong", postalCode: "2508", provinceId: 20 },
    { id: 7, name: "Arrecifes", postalCode: "2740", provinceId: 1 },
    { id: 8, name: "Arroyo Ceibal", postalCode: "3575", provinceId: 20 },
    { id: 9, name: "Avellaneda", postalCode: "3561", provinceId: 20 },
    { id: 10, name: "Avia Terai", postalCode: "3706", provinceId: 3 },
    { id: 11, name: "Balnearia", postalCode: "5141", provinceId: 5 },
    { id: 12, name: "Bandera", postalCode: "3064", provinceId: 21 },
    { id: 13, name: "Bigand", postalCode: "3061", provinceId: 20 },
    { id: 14, name: "Buenos Aires", postalCode: "1425", provinceId: 1 },
    { id: 15, name: "Calchaqui", postalCode: "3050", provinceId: 20 },
    { id: 16, name: "Canals", postalCode: "2650", provinceId: 5 },
    { id: 17, name: "Caada de Gomez", postalCode: "2500", provinceId: 20 },
    { id: 18, name: "Caada Del Ucle", postalCode: "2635", provinceId: 20 },
    { id: 19, name: "Cañuelas", postalCode: "1814", provinceId: 1 },
    { id: 20, name: "Capital Federal", postalCode: "1428", provinceId: 1 },
    { id: 21, name: "Casilda", postalCode: "2170", provinceId: 20 },
    { id: 22, name: "Ceres", postalCode: "2340", provinceId: 20 },
    { id: 23, name: "Chabas", postalCode: "2173", provinceId: 20 },
    { id: 24, name: "Chacabuco", postalCode: "6740", provinceId: 1 },
    { id: 25, name: "Charata ", postalCode: "3730", provinceId: 3 },
    { id: 26, name: "Choroti", postalCode: "3733", provinceId: 3 },
    { id: 27, name: "Ciudadela", postalCode: "1702", provinceId: 1 },
    { id: 28, name: "Colonia Alpina", postalCode: "3061", provinceId: 20 },
    { id: 29, name: "Colonia Dora", postalCode: "4332", provinceId: 21 },
    { id: 30, name: "Colonia Rosa", postalCode: "2351", provinceId: 20 },
    { id: 31, name: "Cordoba", postalCode: "5000", provinceId: 5 },
    { id: 32, name: "Cordoba Capital", postalCode: "5000", provinceId: 5 },
    {
      id: 33,
      name: "Coronel Rodolfo S. Dominguez",
      postalCode: "2105",
      provinceId: 20,
    },
    { id: 34, name: "El Trebol", postalCode: "2535", provinceId: 20 },
    { id: 35, name: "Firmat", postalCode: "2630", provinceId: 20 },
    { id: 36, name: "Godoy", postalCode: "2921", provinceId: 20 },
    { id: 37, name: "Gral Pinedo", postalCode: "3731", provinceId: 3 },
    { id: 38, name: "Granadero Baigorria", postalCode: "2152", provinceId: 20 },
    { id: 39, name: "Hermoso Campo", postalCode: "3733", provinceId: 3 },
    { id: 40, name: "Hersilia", postalCode: "2352", provinceId: 20 },
    { id: 41, name: "Humberto 1", postalCode: "2309", provinceId: 20 },
    { id: 42, name: "Juan B. Molina", postalCode: "2103", provinceId: 20 },
    { id: 43, name: "La Banda", postalCode: "4300", provinceId: 21 },
    { id: 44, name: "La Playosa", postalCode: "5911", provinceId: 5 },
    { id: 45, name: "Las Breñas", postalCode: "3722", provinceId: 3 },
    { id: 46, name: "Las Parejas", postalCode: "2505", provinceId: 20 },
    { id: 47, name: "Las Rosas ", postalCode: "2520", provinceId: 20 },
    { id: 48, name: "Lehmann", postalCode: "2305", provinceId: 20 },
    { id: 49, name: "Los Juries", postalCode: "3763", provinceId: 21 },
    { id: 50, name: "Los Molinos", postalCode: "2181", provinceId: 20 },
    { id: 51, name: "Los Surgentes", postalCode: "2581", provinceId: 5 },
    { id: 52, name: "Malvinas Argentinas", postalCode: "5125", provinceId: 5 },
    { id: 53, name: "Margarita ", postalCode: "3056", provinceId: 20 },
    { id: 54, name: "Meson de Fierro", postalCode: "3732", provinceId: 3 },
    { id: 55, name: "Mison Nueva Ponpeya", postalCode: "3705", provinceId: 3 },
    { id: 56, name: "Montes de Oca", postalCode: "2521", provinceId: 20 },
    { id: 57, name: "Morteros", postalCode: "2421", provinceId: 5 },
    { id: 58, name: "Munro", postalCode: "1605", provinceId: 1 },
    { id: 59, name: "Necochea", postalCode: "7630", provinceId: 1 },
    { id: 60, name: "Oncativo", postalCode: "5986", provinceId: 5 },
    { id: 61, name: "P.R. Saenz Peña", postalCode: "3700", provinceId: 3 },
    { id: 62, name: "Pilar", postalCode: "3085", provinceId: 20 },
    { id: 63, name: "Progreso", postalCode: "3023", provinceId: 20 },
    { id: 64, name: "Puerto Madrid ", postalCode: "9120", provinceId: 4 },
    { id: 65, name: "Rafaela ", postalCode: "2300", provinceId: 20 },
    { id: 66, name: "Realic", postalCode: "6200", provinceId: 10 },
    { id: 67, name: "Reconquista", postalCode: "3560", provinceId: 20 },
    { id: 68, name: "Roldan", postalCode: "2134", provinceId: 20 },
    { id: 69, name: "Rosario", postalCode: "2000", provinceId: 20 },
    { id: 70, name: "Sa Pereira", postalCode: "3011", provinceId: 20 },
    { id: 71, name: "San Bernardo", postalCode: "3061", provinceId: 20 },
    { id: 72, name: "San Carlos Centro", postalCode: "3013", provinceId: 20 },
    { id: 73, name: "San Cristobal", postalCode: "3070", provinceId: 20 },
    { id: 74, name: "San Fernando", postalCode: "1646", provinceId: 1 },
    { id: 75, name: "San Francisco", postalCode: "2400", provinceId: 5 },
    { id: 76, name: "San Guillermo", postalCode: "2347", provinceId: 20 },
    { id: 77, name: "San Javier", postalCode: "3005", provinceId: 20 },
    { id: 78, name: "San Justo", postalCode: "3040", provinceId: 20 },
    { id: 79, name: "Santa Fe", postalCode: "3000", provinceId: 20 },
    { id: 80, name: "Santa Isabel", postalCode: "2605", provinceId: 20 },
    { id: 81, name: "Santa Margarita", postalCode: "3061", provinceId: 20 },
    { id: 82, name: "Santa Sylvina", postalCode: "3542", provinceId: 3 },
    { id: 83, name: "Santa Teresa", postalCode: "2111", provinceId: 20 },
    { id: 84, name: "Sauce Viejo", postalCode: "3017", provinceId: 20 },
    { id: 85, name: "Sunchales", postalCode: "2322", provinceId: 20 },
    { id: 86, name: "Teodelina", postalCode: "6009", provinceId: 20 },
    { id: 88, name: "Tostado", postalCode: "3060", provinceId: 20 },
    { id: 89, name: "Tres Isletas", postalCode: "3703", provinceId: 3 },
    { id: 90, name: "Venado Tuerto", postalCode: "2600", provinceId: 20 },
    { id: 91, name: "Villa Angela", postalCode: "3540", provinceId: 3 },
    { id: 92, name: "Villa Ballester", postalCode: "1653", provinceId: 1 },
    { id: 93, name: "Villa Eloisa", postalCode: "2503", provinceId: 20 },
    { id: 94, name: "Villa Maria", postalCode: "5900", provinceId: 5 },
    { id: 95, name: "Villa Minetti", postalCode: "3061", provinceId: 20 },
    { id: 96, name: "Villa Ocampo", postalCode: "3580", provinceId: 20 },
    { id: 97, name: "Villa Ramallo", postalCode: "2914", provinceId: 1 },
    { id: 98, name: "Villa Trinidad", postalCode: "2345", provinceId: 20 },
    { id: 99, name: "Galvez", postalCode: "2252", provinceId: 20 },
    { id: 100, name: "Esperanza", postalCode: "3080", provinceId: 20 },
    { id: 101, name: "Quimili", postalCode: "3740", provinceId: 21 },
    { id: 102, name: "Lincoln", postalCode: "6070", provinceId: 1 },
    { id: 103, name: "Totoras", postalCode: "2144", provinceId: 20 },
    { id: 104, name: "Pozo Borrado", postalCode: "3061", provinceId: 20 },
    { id: 105, name: "San Jeronimo Norte", postalCode: "3015", provinceId: 20 },
    { id: 106, name: "Puerto General San Martin", postalCode: "2202", provinceId: 20 },
    { id: 107, name: "Ferre", postalCode: "6027", provinceId: 1 },
    { id: 108, name: "Los Laureles", postalCode: "3567", provinceId: 20 },
    { id: 109, name: "Martinez", postalCode: "1640", provinceId: 1 },
    { id: 110, name: "Resistencia", postalCode: "3500", provinceId: 3 },
    { id: 111, name: "Bustinza", postalCode: "2501", provinceId: 20 },
  ]

  // Get province mappings for cities
  for (const city of cities) {
    const dbProvinceId = provinceMap.get(city.provinceId);
    if (dbProvinceId) {
      await prisma.city.upsert({
        where: {
          // depending on your Prisma schema you might have a unique constraint like (name, provinceId)
          // if so, adjust the where to that unique composite. Here we attempt to use a composite-like shape
          // which requires that your Prisma schema defines it as @@unique([name, provinceId]) named accordingly.
          // If you have a different unique key, change this block to match your schema.
          id: city.id || 0,
          name: city.name,
          provinceId: dbProvinceId,
        },
        update: {},
        create: {
          name: city.name,
          postalCode: city.postalCode,
          provinceId: dbProvinceId,
        },
      });
    }
  }
  console.log("Cities created");

  // Create sample addresses
  const sampleAddresses = [
    {
      street: "Av. Pellegrini",
      number: "1234",
      floor: "5",
      apartment: "A",
      postalCode: "2000",
      neighborhood: "Centro",
      reference: "Frente al parque",
      latitude: -32.9442426,
      longitude: -60.6505388,
      cityName: "Rosario",
      isActive: true,
    },
    {
      street: "San Martín",
      number: "567",
      postalCode: "3000",
      neighborhood: "Centro",
      reference: "Cerca de la terminal",
      latitude: -31.6333,
      longitude: -60.7,
      cityName: "Santa Fe",
      isActive: true,
    },
    {
      street: "Córdoba",
      number: "890",
      floor: "2",
      apartment: "B",
      postalCode: "5000",
      neighborhood: "Nueva Córdoba",
      reference: "Edificio azul",
      latitude: -31.4201,
      longitude: -64.1888,
      cityName: "Cordoba",
      isActive: true,
    },
  ]

  for (const address of sampleAddresses) {
    const city = await prisma.city.findFirst({
      where: { name: address.cityName },
    });

    if (city) {
      await prisma.address.create({
        data: {
          street: address.street,
          number: address.number,
          floor: address.floor,
          apartment: address.apartment,
          postalCode: address.postalCode,
          neighborhood: address.neighborhood,
          reference: address.reference,
          latitude: address.latitude,
          longitude: address.longitude,
          isActive: address.isActive,
          cityId: city.id,
        },
      });
    }
  }
  console.log("Sample addresses created");

  // Create equipment categories and types
  const equipmentCategories = [
    {
      name: "Vehículos",
      types: ["Camión", "Camioneta", "Auto"],
    },
    {
      name: "Maquinaria Pesada",
      types: ["Excavadora", "Retroexcavadora", "Topadora"],
    },
    {
      name: "Maquinaria Agrícola",
      types: ["Tractor", "Cosechadora", "Sembradora"],
    },
  ]

  for (const category of equipmentCategories) {
    const createdCategory = await prisma.equipmentCategory.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name,
      },
    });

    for (const typeName of category.types) {
      await prisma.equipmentType.upsert({
        where: {
          name_categoryId: { name: typeName, categoryId: createdCategory.id },
        },
        update: {},
        create: {
          name: typeName,
          categoryId: createdCategory.id,
        },
      });
    }
  }
  console.log("Equipment categories and types created");

  // Create inspection types
  const inspectionTypes = [
    "Mantenimiento Preventivo",
    "Mantenimiento Correctivo",
    "Inspección de Seguridad",
    "Inspección Técnica",
  ];

  for (const typeName of inspectionTypes) {
    await prisma.inspectionType.upsert({
      where: { name: typeName },
      update: {},
      create: {
        name: typeName,
      },
    });
  }
  console.log("Inspection types created");

  // Create brands
  const brands = [
    "A. Vetre", "Agrometal", "Aiello", "AKRON", "Baimo", "BEC-CAR", "Belen", "Budassi", "Bustinza", "CAFIRO",
    "CAT", "Ceruti", "Conese", "CORVEN", "Crucianelli", "Dolzani", "Dupper", "El Fierro", "Falito", "Genovese",
    "Gentilli", "Grosspal", "Honda", "John Deere", "Mainero", "Marcelini", "Massey Ferguson", "Mauro", "Metalfor",
    "Moducar", "MS", "Musillo", "OMBU", "Plastrong", "PPG", "Scania", "Sola y Brusa", "TBeH", "Toyota", "TRAIMAX",
    "Zanello", "Alliance", "BKT", "Protto", "Donaldson", "Mobil", "Ford"
  ]

  for (const brandName of brands) {
    await prisma.brand.upsert({
      where: { name: brandName },
      update: {},
      create: {
        name: brandName,
        // schema.prisma requires a unique non-null `code` for Brand
        // Generate a code from the name: uppercase, non-alphanumerics to underscore
        code: brandName.toUpperCase().replace(/[^A-Z0-9]+/g, "_"),
        isActive: true,
      },
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
  ]

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
