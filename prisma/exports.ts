// filepath: sae-backend/prisma/exports.ts

import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const exportDir = path.join(__dirname, "seeds-data");

async function main() {
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
  }

  // 👉 Lista de modelos que queremos exportar
  const models = {
    users: () => prisma.user.findMany(),
    companies: () => prisma.company.findMany(),
    businessCategories: () => prisma.businessCategory.findMany(),
    businessSubCategories: () => prisma.businessSubCategory.findMany(),
    contacts: () => prisma.contact.findMany(),
    contactLinks: () => prisma.contactLink.findMany(),
    countries: () => prisma.country.findMany(),
    provinces: () => prisma.province.findMany(),
    cities: () => prisma.city.findMany(),
    addresses: () => prisma.address.findMany(),
    employees: () => prisma.employee.findMany(),
    employeeCategories: () => prisma.employeeCategory.findMany(),
    employeePositions: () => prisma.employeePosition.findMany(),
    employeeVacations: () => prisma.employeeVacation.findMany(),
    persons: () => prisma.person.findMany(),
    families: () => prisma.family.findMany(),
    documents: () => prisma.document.findMany(),
    equipment: () => prisma.equipment.findMany(),
    equipmentCategories: () => prisma.equipmentCategory.findMany(),
    equipmentTypes: () => prisma.equipmentType.findMany(),
    equipmentModels: () => prisma.equipmentModel.findMany(),
    inspections: () => prisma.inspection.findMany(),
    inspectionTypes: () => prisma.inspectionType.findMany(),
    parts: () => prisma.part.findMany(),
    partOrderCompanies: () => prisma.partOrderCompany.findMany(),
    partOrderEquipmentModels: () => prisma.partOrderEquipmentModel.findMany(),
    partOrderEquipments: () => prisma.partOrderEquipment.findMany(),
    products: () => prisma.product.findMany(),
    productCompanies: () => prisma.productCompany.findMany(),
    presentations: () => prisma.presentation.findMany(),
    tires: () => prisma.tire.findMany(),
    brands: () => prisma.brand.findMany(),
    units: () => prisma.unit.findMany(),
  };

  for (const [name, query] of Object.entries(models)) {
    const data = await query();
    const filePath = path.join(exportDir, `${name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Exported ${data.length} rows from ${name} → ${filePath}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
