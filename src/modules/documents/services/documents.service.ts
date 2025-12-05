//filepath: sae-backend/src/modules/documents/services/documents.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDocumentDto } from "../dto/create-document.dto";
import { UpdateDocumentDto } from "../dto/update-document.dto";
import { DocumentQueryDto } from "../dto/document-query.dto";
import { PrismaService } from "@prisma/prisma.service";
import { BaseResponseDto } from "@common/dto";

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  private slugify(input: string): string {
    return input
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-zA-Z0-9]+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "")
      .toLowerCase();
  }

  async getEmployeeFolderName(employeeId: number): Promise<string> {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
      include: { person: true },
    });
    if (!employee || !employee.person) {
      throw new NotFoundException("Empleado no encontrado");
    }
    const lastName = this.slugify(employee.person.lastName || "sin_apellido");
    const firstName = this.slugify(employee.person.firstName || "sin_nombre");
    const dni = this.slugify(employee.person.dni || "sin_dni");
    // Pattern: apellido_nombre_dni
    return `${lastName}_${firstName}_${dni}`;
  }

  async getCompanyFolderName(companyId: number): Promise<string> {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });
    if (!company) {
      throw new NotFoundException("Empresa no encontrada");
    }
    const name = this.slugify(company.name || "sin_nombre");
    const cuit = this.slugify(company.cuit || "sin_cuit");
    // Pattern: nombre_cuit
    return `${name}_${cuit}`;
  }

  async create(createDocumentDto: CreateDocumentDto) {
    const document = await this.prisma.document.create({
      data: createDocumentDto,
    });
    return { data: document };
  }

  async findAll(
    query: DocumentQueryDto = new DocumentQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q, sortBy = "uploadedAt", sortOrder = "desc" } = query;

    // Build WHERE clause
    const where: any = {};
    if (query.employeeId) where.employeeId = query.employeeId;
    if (query.companyId) where.companyId = query.companyId;

    // Add search filter if provided
    if (q) {
      where.OR = [
        { filename: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    // Execute query with transaction
    const [data, total] = await this.prisma.$transaction([
      this.prisma.document.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.document.count({ where }),
    ]);

    return new BaseResponseDto(data, total, query.page || 1, query.limit || 10);
  }

  async findOne(id: number) {
    const document = await this.prisma.document.findUniqueOrThrow({
      where: { id },
    });
    return { data: document };
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto) {
    const document = await this.prisma.document.update({
      where: { id },
      data: updateDocumentDto,
    });
    return { data: document };
  }

  async remove(id: number) {
    // get the document to know file path
    const doc = await this.prisma.document.findUnique({ where: { id } });
    const deleted = await this.prisma.document.delete({ where: { id } });
    // best-effort: remove file from disk if present
    if (doc?.path) {
      try {
        const { existsSync, unlinkSync } = await import("fs");
        if (existsSync(doc.path)) unlinkSync(doc.path);
      } catch {}
    }
    return deleted;
  }
}
