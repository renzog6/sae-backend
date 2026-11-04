import { HistoryType, PrismaClient, SeverityLevel } from "@prisma/client";

const prisma = new PrismaClient();
const dryRun = process.argv.includes("--dry-run");

async function main() {
  const employees = await prisma.employee.findMany({
    where: { deletedAt: null },
    include: {
      person: true,
      category: true,
      position: true,
    },
    orderBy: { id: "asc" },
  });

  const existingHireLogs = await prisma.historyLog.findMany({
    where: {
      type: HistoryType.EMPLOYEE_HIRE,
      employeeId: { in: employees.map(({ id }) => id) },
    },
    select: { employeeId: true, isActive: true, deletedAt: true },
  });

  const existingByEmployeeId = new Map(
    existingHireLogs.map((log) => [log.employeeId, log])
  );
  const missingEmployees = employees.filter(
    ({ id }) => !existingByEmployeeId.has(id)
  );

  const softDeletedExisting = existingHireLogs.filter(
    (log) => log.isActive === false || log.deletedAt !== null
  ).length;

  console.log(`Empleados revisados: ${employees.length}`);
  console.log(`Historiales de alta existentes: ${existingHireLogs.length}`);
  console.log(`Historiales de alta faltantes: ${missingEmployees.length}`);
  if (softDeletedExisting > 0) {
    console.log(
      `Historiales existentes soft-deleted (no duplicados): ${softDeletedExisting}`
    );
  }

  if (dryRun || missingEmployees.length === 0) {
    if (dryRun) console.log("Modo dry-run: no se modificó la base de datos.");
    return;
  }

  await prisma.$transaction(async (tx) => {
    for (const employee of missingEmployees) {
      await tx.historyLog.create({
        data: {
          title: "Nuevo empleado contratado",
          description: `${employee.person.firstName} ${employee.person.lastName} comenzó a trabajar en la empresa`,
          type: HistoryType.EMPLOYEE_HIRE,
          severity: SeverityLevel.SUCCESS,
          eventDate: employee.hireDate,
          employeeId: employee.id,
          metadata: JSON.stringify({
            hireDate: employee.hireDate.toISOString(),
            employeeCode: employee.employeeCode,
            category: employee.category.name,
            position: employee.position.name,
          }),
        },
      });
    }
  });

  console.log(`Historiales de alta creados: ${missingEmployees.length}`);
}

main()
  .catch((error) => {
    console.error("No se pudo completar el backfill de historiales de alta:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
