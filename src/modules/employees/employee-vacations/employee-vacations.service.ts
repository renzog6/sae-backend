import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEmployeeVacationDto } from "./dto/create-employee-vacation.dto";
import { UpdateEmployeeVacationDto } from "./dto/update-employee-vacation.dto";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";
import { formatDateOnly } from "@common/utils/date.util";
import { PDFDocument } from "pdf-lib";
import * as fs from "fs";
import * as path from "path";
import { HistoryLogService } from "../../history/services/history-log.service";
import { HistoryType, SeverityLevel, EmployeeVacation } from "@prisma/client";

@Injectable()
export class EmployeeVacationsService extends BaseService<EmployeeVacation> {
  constructor(
    protected prisma: PrismaService,
    private historyLogService: HistoryLogService
  ) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.employeeVacation;
  }

  protected buildSearchConditions(q: string) {
    // Check if q is a number for year search
    const yearSearch = !isNaN(parseInt(q)) ? parseInt(q) : undefined;

    return [
      { detail: { contains: q } },
      {
        employee: {
          person: { firstName: { contains: q } },
        },
      },
      {
        employee: {
          person: { lastName: { contains: q } },
        },
      },
      ...(yearSearch ? [{ year: { equals: yearSearch } }] : []),
    ];
  }

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

    return { data: vacation };
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const include = { employee: true };
    return super.findAll(query, {}, include);
  }

  async findOne(id: number) {
    const rec = await this.prisma.employeeVacation.findUnique({
      where: { id },
      include: { employee: true },
    });
    if (!rec)
      throw new NotFoundException(`EmployeeVacation with ID ${id} not found`);
    return { data: rec };
  }

  async update(id: number, dto: UpdateEmployeeVacationDto) {
    const currentResponse = await this.findOne(id);
    const current = currentResponse.data;
    const nextStart = (dto as any).startDate
      ? new Date((dto as any).startDate)
      : current.startDate;
    const nextDays = dto.days ? Number(dto.days) : current.days;
    const nextEnd = new Date(nextStart);
    nextEnd.setDate(nextEnd.getDate() + nextDays - 1);
    const nextYear = dto.year ? Number(dto.year) : nextStart.getFullYear();

    const vacation = await this.prisma.employeeVacation.update({
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
    return { data: vacation };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.employeeVacation.delete({ where: { id } });
    return { message: "Vacation record deleted successfully" };
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
    const desde = formatDateOnly(vacation.startDate);

    // Sumamos los días a la fecha de inicio (usando solo partes de fecha)
    const hastaDate = new Date(vacation.startDate);
    hastaDate.setDate(hastaDate.getDate() + dias - 1);
    const hasta = formatDateOnly(hastaDate);

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
}


