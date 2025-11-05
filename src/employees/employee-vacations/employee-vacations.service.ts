// filepath: sae-backend/src/employees/employee-vacations/employee-vacations.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEmployeeVacationDto } from "./dto/create-employee-vacation.dto";
import { UpdateEmployeeVacationDto } from "./dto/update-employee-vacation.dto";
import { PrismaService } from "../../prisma/prisma.service";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { PDFDocument } from "pdf-lib";
import { Response } from "express";
import * as fs from "fs";
import * as path from "path";
import * as ExcelJS from "exceljs";
import { HistoryLogService } from "../../history/services/history-log.service";
import { HistoryType, SeverityLevel } from "@prisma/client";

interface ExportOptions {
  filename?: string;
  includeCompany?: boolean;
}
@Injectable()
export class EmployeeVacationsService {
  constructor(
    private prisma: PrismaService,
    private historyLogService: HistoryLogService
  ) {}

  async create(dto: CreateEmployeeVacationDto) {
    const start = new Date(dto.startDate);
    const days = dto.days;
    const end = new Date(start);
    end.setDate(end.getDate() + days - 1);
    const year = dto.year ? Number(dto.year) : start.getFullYear();
    const type = (dto as any).type ?? "TAKEN";
    const settlementDate = dto.settlementDate
      ? new Date(dto.settlementDate)
      : new Date();

    const vacation = await this.prisma.employeeVacation.create({
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
      include: { employee: { include: { person: true } } },
    });

    // Create history log based on vacation type
    const historyType =
      type === "ASSIGNED"
        ? HistoryType.VACATION_ASSIGNED
        : HistoryType.VACATION_TAKEN;
    const title =
      type === "ASSIGNED" ? "Vacaciones asignadas" : "Vacaciones tomadas";
    const description =
      type === "ASSIGNED"
        ? `${vacation.employee.person.firstName} ${vacation.employee.person.lastName} recibió ${days} días de vacaciones para el año ${year}`
        : `${vacation.employee.person.firstName} ${vacation.employee.person.lastName} tomó ${days} días de vacaciones`;

    await this.historyLogService.createLog({
      title,
      description,
      type: historyType,
      severity: SeverityLevel.INFO,
      eventDate: settlementDate,
      employeeId: vacation.employeeId,
      metadata: JSON.stringify({
        vacationId: vacation.id,
        days: vacation.days,
        year: vacation.year,
        startDate: vacation.startDate.toISOString(),
        endDate: vacation.endDate.toISOString(),
        type: vacation.type,
      }),
    });

    return vacation;
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
    const desde = this.formatDateOnly(vacation.startDate);

    // Sumamos los días a la fecha de inicio (usando solo partes de fecha)
    const hastaDate = new Date(vacation.startDate);
    hastaDate.setDate(hastaDate.getDate() + dias - 1);
    const hasta = this.formatDateOnly(hastaDate);

    // 🔹 Completar los campos del formulario (tolerante a campos faltantes)
    const safeSet = (fieldName: string, value: string) => {
      try {
        form.getTextField(fieldName).setText(value);
      } catch (_) {
        // Campo no existe en la plantilla; lo ignoramos para evitar 500
      }
    };

    // 🔹 Fecha de liquidación en formato extendido (usando UTC para evitar timezone shifts)
    const fechaLiquidacion = new Date(
      vacation.settlementDate
    ).toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
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

  /**
   * Genera un archivo Excel con las vacaciones de un empleado específico
   */
  async exportVacationsToExcel(
    employeeId: number,
    options: ExportOptions = {}
  ): Promise<Buffer> {
    const { includeCompany = false } = options; // Para empleado específico, no incluir empresa

    try {
      const vacations = await this.fetchVacationsData();
      const employeeVacations = vacations.filter(
        (v) => v.employee?.id === employeeId
      );
      const workbook = this.createWorkbook(employeeVacations, includeCompany);
      const buffer = Buffer.from(await workbook.xlsx.writeBuffer());

      return buffer;
    } catch (error) {
      throw new Error(`Error al exportar Excel: ${error.message}`);
    }
  }

  /**
   * Genera un archivo Excel con los datos de empleados y sus vacaciones
   */
  async exportEmployeesVacationsToExcel(
    options: ExportOptions = {}
  ): Promise<Buffer> {
    const { includeCompany = true } = options;

    try {
      const employees = await this.fetchEmployeesData();
      const workbook = this.createEmployeesWorkbook(employees, includeCompany);
      const buffer = Buffer.from(await workbook.xlsx.writeBuffer());

      return buffer;
    } catch (error) {
      throw new Error(`Error al exportar Excel: ${error.message}`);
    }
  }

  /**
   * Obtiene los datos de vacaciones desde la base de datos
   */
  private async fetchVacationsData() {
    return this.prisma.employeeVacation.findMany({
      include: {
        employee: {
          include: {
            person: true,
            company: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Obtiene los datos de empleados con sus vacaciones
   */
  private async fetchEmployeesData() {
    return this.prisma.employee.findMany({
      include: {
        person: true,
        category: true,
        position: true,
        company: true,
        vacations: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Crea y configura el workbook de Excel
   */
  private createWorkbook(vacations: any[], includeCompany: boolean) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Vacaciones");

    this.configureSheetColumns(sheet, includeCompany);
    this.addDataToSheet(sheet, vacations, includeCompany);
    this.applyStyles(sheet);

    return workbook;
  }

  /**
   * Crea y configura el workbook de Excel para empleados
   */
  private createEmployeesWorkbook(employees: any[], includeCompany: boolean) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Empleados Vacaciones");

    this.configureEmployeesSheetColumns(sheet, includeCompany);
    this.addEmployeesDataToSheet(sheet, employees, includeCompany);
    this.applyStyles(sheet);

    return workbook;
  }

  /**
   * Configura las columnas de la hoja
   */
  private configureSheetColumns(
    sheet: ExcelJS.Worksheet,
    includeCompany: boolean
  ) {
    const columns = [
      { header: "Fecha", key: "settlementDate", width: 15 },
      { header: "Tipo", key: "type", width: 12 },
      { header: "Días", key: "days", width: 10 },
      { header: "Año", key: "year", width: 10 },
      { header: "Periodo", key: "period", width: 25 },
      { header: "Detalle", key: "detail", width: 30 },
    ];

    sheet.columns = columns;
  }

  /**
   * Configura las columnas de la hoja de empleados
   */
  private configureEmployeesSheetColumns(
    sheet: ExcelJS.Worksheet,
    includeCompany: boolean
  ) {
    const baseColumns = [
      { header: "Legajo", key: "employeeCode", width: 15 },
      { header: "Apellido y Nombre", key: "fullName", width: 30 },
      { header: "Ingreso", key: "hireDate", width: 15 },
      { header: "Antigüedad", key: "tenure", width: 15 },
      { header: "Días Disponibles", key: "availableDays", width: 15 },
      { header: "Categoría y Puesto", key: "categoryPosition", width: 30 },
    ];

    if (includeCompany) {
      baseColumns.splice(1, 0, {
        header: "Empresa",
        key: "company",
        width: 25,
      });
    }

    sheet.columns = baseColumns;
  }

  /**
   * Agrega los datos a la hoja
   */
  private addDataToSheet(
    sheet: ExcelJS.Worksheet,
    vacations: any[],
    includeCompany: boolean
  ) {
    vacations.forEach((vacation) => {
      const rowData = this.mapVacationToRow(vacation, includeCompany);
      sheet.addRow(rowData);
    });
  }

  /**
   * Agrega los datos de empleados a la hoja
   */
  private addEmployeesDataToSheet(
    sheet: ExcelJS.Worksheet,
    employees: any[],
    includeCompany: boolean
  ) {
    employees.forEach((employee) => {
      const rowData = this.mapEmployeeToRow(employee, includeCompany);
      sheet.addRow(rowData);
    });
  }

  /**
   * Mapea una vacación a una fila de Excel
   */
  private mapVacationToRow(vacation: any, includeCompany: boolean) {
    const period =
      vacation.type !== "ASSIGNED"
        ? `${this.formatDate(vacation.startDate)} - ${this.formatDate(vacation.endDate)}`
        : "-";

    return {
      settlementDate: this.formatDate(vacation.settlementDate),
      type: vacation.type === "ASSIGNED" ? "Asignadas" : "Tomadas",
      days: vacation.days,
      year: vacation.year,
      period,
      detail: vacation.detail || "",
    };
  }

  /**
   * Mapea un empleado a una fila de Excel
   */
  private mapEmployeeToRow(employee: any, includeCompany: boolean) {
    const fullName = this.formatEmployeeName(employee.person);
    const hireDate = this.formatDate(employee.hireDate);
    const tenure = this.calculateTenure(employee.hireDate);
    const availableDays = this.calculateAvailableDays(employee.vacations);
    const categoryPosition = `${employee.category?.name ?? "-"} - ${employee.position?.name ?? "-"}`;

    const baseRow = {
      employeeCode: employee.employeeCode || "",
      fullName,
      hireDate,
      tenure,
      availableDays,
      categoryPosition,
    };

    if (includeCompany) {
      return {
        ...baseRow,
        company: employee.company?.name || "",
      };
    }

    return baseRow;
  }

  /**
   * Formatea el nombre del empleado
   */
  private formatEmployeeName(person: any): string {
    if (!person) return "";
    return `${person.lastName || ""} ${person.firstName || ""}`.trim();
  }

  /**
   * Formatea una fecha consistentemente
   */
  private formatDate(date?: Date | null): string {
    if (!date) return "";
    return new Date(date).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  /**
   * Formatea una fecha sin considerar timezone ni hora, solo fecha
   */
  private formatDateOnly(date: Date): string {
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  /**
   * Calcula la antigüedad desde la fecha de ingreso
   */
  private calculateTenure(hireDate?: Date | null): string {
    if (!hireDate) return "";
    const hire = new Date(hireDate);
    const now = new Date();
    const years = now.getFullYear() - hire.getFullYear();
    const months = now.getMonth() - hire.getMonth();
    const totalMonths = years * 12 + months;
    const y = Math.floor(totalMonths / 12);
    const m = totalMonths % 12;
    return `${y} años ${m} meses`;
  }

  /**
   * Calcula los días disponibles de vacaciones
   */
  private calculateAvailableDays(vacations: any[]): number {
    let assigned = 0;
    let taken = 0;
    for (const v of vacations || []) {
      const d = Number(v?.days ?? 0) || 0;
      if (v?.type === "ASSIGNED") assigned += d;
      else if (v?.type === "TAKEN") taken += d;
    }
    return assigned - taken;
  }

  /**
   * Aplica estilos a la hoja
   */
  private applyStyles(sheet: ExcelJS.Worksheet) {
    // Estilo para la fila de encabezados
    const headerRow = sheet.getRow(1);
    headerRow.font = {
      bold: true,
      color: { argb: "FFFFFFFF" },
    };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF2E86AB" },
    };
    headerRow.alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    // Estilos para las filas de datos
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.alignment = {
          vertical: "middle",
          horizontal: "center",
        };

        // Alternar colores de fondo para mejor legibilidad
        if (rowNumber % 2 === 0) {
          row.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFF0F0F0" },
          };
        }
      }
    });

    // Ajustar automáticamente el ancho de las columnas según el contenido
    sheet.columns.forEach((column) => {
      let maxLength = 10;
      column.eachCell?.({ includeEmpty: true }, (cell) => {
        const length = cell.value ? cell.value.toString().length : 0;
        if (length > maxLength) maxLength = length;
      });
      column.width = maxLength < 10 ? 10 : maxLength + 2;
    });

    // Congelar la fila de encabezados
    sheet.views = [{ state: "frozen", ySplit: 1 }];
  }

  /**
   * Envía el archivo como descarga
   */
  private sendAsDownload(res: Response, buffer: Buffer, filename: string) {
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  }
}
