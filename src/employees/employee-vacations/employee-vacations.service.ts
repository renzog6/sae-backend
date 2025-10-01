// filepath: sae-backend/src/employees/employee-vacations/employee-vacations.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEmployeeVacationDto } from "./dto/create-employee-vacation.dto";
import { UpdateEmployeeVacationDto } from "./dto/update-employee-vacation.dto";
import { PrismaService } from "../../prisma/prisma.service";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { PDFDocument } from "pdf-lib";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class EmployeeVacationsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateEmployeeVacationDto) {
    console.log(
      "EmployeeVacationsService.create - DTO received:",
      JSON.stringify(dto, null, 2)
    );
    const start = new Date(dto.startDate);
    const days = dto.days;
    const end = new Date(start);
    end.setDate(end.getDate() + days - 1);
    const year = dto.year ? Number(dto.year) : start.getFullYear();
    const type = (dto as any).type ?? "TAKEN";
    const settlementDate = dto.settlementDate
      ? new Date(dto.settlementDate)
      : new Date();

    return this.prisma.employeeVacation.create({
      data: {
        detail: (dto as any).detail,
        days,
        year,
        startDate: start,
        endDate: end,
        settlementDate,
        type: type as any,
        employee: { connect: { id: Number(dto.employeeId) } },
      },
      include: { employee: true },
    });
  }

  async findAll(pagination?: PaginationDto) {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.employeeVacation.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: { employee: true },
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.employeeVacation.count(),
    ]);
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: number) {
    const rec = await this.prisma.employeeVacation.findUnique({
      where: { id },
      include: { employee: true },
    });
    if (!rec)
      throw new NotFoundException(`EmployeeVacation with ID ${id} not found`);
    return rec;
  }

  async update(id: number, dto: UpdateEmployeeVacationDto) {
    const current = await this.findOne(id);
    const nextStart = (dto as any).startDate
      ? new Date((dto as any).startDate)
      : current.startDate;
    const nextDays = dto.days ? Number(dto.days) : current.days;
    const nextEnd = new Date(nextStart);
    nextEnd.setDate(nextEnd.getDate() + nextDays - 1);
    const nextYear = dto.year ? Number(dto.year) : nextStart.getFullYear();

    return this.prisma.employeeVacation.update({
      where: { id },
      data: {
        ...(typeof dto.detail !== "undefined" ? { detail: dto.detail } : {}),
        days: nextDays,
        year: nextYear,
        startDate: nextStart,
        endDate: nextEnd,
        ...(dto.settlementDate
          ? { settlementDate: new Date(dto.settlementDate) }
          : {}),
        ...(typeof (dto as any).type !== "undefined"
          ? { type: (dto as any).type as any }
          : {}),
        ...(typeof (dto as any).employeeId !== "undefined"
          ? { employee: { connect: { id: Number((dto as any).employeeId) } } }
          : {}),
      },
      include: { employee: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.employeeVacation.delete({ where: { id } });
    return { id };
  }

  async generateVacationPdf(id: number): Promise<Buffer> {
    const vacation = await this.prisma.employeeVacation.findUnique({
      where: { id },
      include: { employee: { include: { person: true } } },
    });

    if (!vacation) throw new NotFoundException("Vacaciones no encontradas");

    // Resolve PDF template from project assets folder
    const pdfPath = path.join(
      process.cwd(),
      "assets",
      "./template_notificacion_vacaciones.pdf"
    );
    if (!fs.existsSync(pdfPath)) {
      throw new NotFoundException(
        `No se encontró la plantilla PDF en: ${pdfPath}`
      );
    }
    const existingPdf = await fs.promises.readFile(pdfPath);

    const pdfDoc = await PDFDocument.load(existingPdf);
    const form = pdfDoc.getForm();

    // 🔹 Valores dinámicos
    const nombreEmpleado =
      vacation.employee.person.lastName +
      " " +
      vacation.employee.person.firstName;
    const dias = vacation.days ?? 0;
    const anio = vacation.year ?? new Date().getFullYear();
    const desde = vacation.startDate.toLocaleDateString("es-AR");

    // Sumamos los días a la fecha de inicio
    const hastaDate = new Date(vacation.startDate);
    hastaDate.setDate(hastaDate.getDate() + dias - 1);
    const hasta = hastaDate.toLocaleDateString("es-AR");

    // 🔹 Completar los campos del formulario (tolerante a campos faltantes)
    const safeSet = (fieldName: string, value: string) => {
      try {
        form.getTextField(fieldName).setText(value);
      } catch (_) {
        // Campo no existe en la plantilla; lo ignoramos para evitar 500
      }
    };

    // 🔹 Fecha de liquidación en formato extendido
    const fechaLiquidacion = vacation.settlementDate.toLocaleDateString(
      "es-AR",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
    safeSet("fecha", `Villa Minetti, ${fechaLiquidacion}`);

    safeSet("nombreEmpleado", nombreEmpleado);
    safeSet("dias", dias.toString());
    safeSet("anio", anio.toString());
    safeSet("desde", desde);
    safeSet("hasta", hasta.toString());
    safeSet("EMPLEADOR", "RCM SA");
    safeSet("EMPLEADO", nombreEmpleado);

    // 🔹 Opción: "aplanar" el formulario para que no se pueda editar
    form.flatten();

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }
}
