// filepath: sae-backend/prisma/exports.ts

import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();
const exportDir = path.join(__dirname, "seeds-data");

async function main() {
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
  }

  // 👉 Lista de modelos que queremos exportar (ordenada alfabéticamente)
  const models = {
    addresses: () => prisma.address.findMany(),
    brands: () => prisma.brand.findMany(),
    businessCategories: () => prisma.businessCategory.findMany(),
    businessSubCategories: () => prisma.businessSubCategory.findMany(),
    cities: () => prisma.city.findMany(),
    companies: () => prisma.company.findMany(),
    contactLinks: () => prisma.contactLink.findMany(),
    contacts: () => prisma.contact.findMany(),
    countries: () => prisma.country.findMany(),
    documents: () => prisma.serverFile.findMany(),
    employeeCategories: () => prisma.employeeCategory.findMany(),
    employeeIncidents: () => prisma.employeeIncident.findMany(),
    employeePositions: () => prisma.employeePosition.findMany(),
    employeeVacations: () => prisma.employeeVacation.findMany(),
    employees: () => prisma.employee.findMany(),
    equipment: () => prisma.equipment.findMany(),
    equipmentAxles: () => prisma.equipmentAxle.findMany(),
    equipmentCategories: () => prisma.equipmentCategory.findMany(),
    equipmentMaintenance: () => prisma.equipmentMaintenance.findMany(),
    equipmentModelParts: () => prisma.equipmentModelPart.findMany(),
    equipmentModels: () => prisma.equipmentModel.findMany(),
    equipmentParts: () => prisma.equipmentPart.findMany(),
    equipmentTypes: () => prisma.equipmentType.findMany(),
    families: () => prisma.family.findMany(),
    historyLogs: () => prisma.historyLog.findMany(),
    inspectionTypes: () => prisma.inspectionType.findMany(),
    inspections: () => prisma.inspection.findMany(),
    partCategories: () => prisma.partCategory.findMany(),
    partOrderCompanies: () => prisma.partOrderCompany.findMany(),
    parts: () => prisma.part.findMany(),
    persons: () => prisma.person.findMany(),
    presentations: () => prisma.presentation.findMany(),
    productCompanies: () => prisma.productCompany.findMany(),
    products: () => prisma.product.findMany(),
    provinces: () => prisma.province.findMany(),
    tireAssignments: () => prisma.tireAssignment.findMany(),
    tireEvents: () => prisma.tireEvent.findMany(),
    tireInspections: () => prisma.tireInspection.findMany(),
    tireRecaps: () => prisma.tireRecap.findMany(),
    tireRotations: () => prisma.tireRotation.findMany(),
    tireModels: () => prisma.tireModel.findMany(),
    tireSizeAliases: () => prisma.tireSizeAlias.findMany(),
    tireSizes: () => prisma.tireSize.findMany(),
    tirePositionConfigs: () => prisma.tirePositionConfig.findMany(),
    tires: () => prisma.tire.findMany(),
    units: () => prisma.unit.findMany(),
    users: () => prisma.user.findMany(),
  };

  for (const [name, query] of Object.entries(models)) {
    try {
      const data = await query();
      const filePath = path.join(exportDir, `${name}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`✅ Exported ${data.length} rows from ${name} → ${filePath}`);
    } catch (error) {
      console.warn(
        `⚠️  Error exporting ${name}: ${error.message}. Continuing...`
      );
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
