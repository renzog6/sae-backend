import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  private slugify(input: string): string {
    return input
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '')
      .toLowerCase();
  }

  async getEmployeeFolderName(employeeId: number): Promise<string> {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
      include: { person: true },
    });
    if (!employee || !employee.person) {
      throw new NotFoundException('Empleado no encontrado');
    }
    const lastName = this.slugify(employee.person.lastName || 'sin_apellido');
    const firstName = this.slugify(employee.person.firstName || 'sin_nombre');
    const dni = this.slugify(employee.person.dni || 'sin_dni');
    // Pattern: apellido_nombre_dni
    return `${lastName}_${firstName}_${dni}`;
  }

  async getCompanyFolderName(companyId: number): Promise<string> {
    const company = await this.prisma.company.findUnique({ where: { id: companyId } });
    if (!company) {
      throw new NotFoundException('Empresa no encontrada');
    }
    const name = this.slugify(company.name || 'sin_nombre');
    const cuit = this.slugify(company.cuit || 'sin_cuit');
    // Pattern: nombre_cuit
    return `${name}_${cuit}`;
  }

  create(createDocumentDto: CreateDocumentDto) {
    return this.prisma.document.create({ data: createDocumentDto });
  }

  findAll(filter?: { companyId?: number; employeeId?: number }) {
    const where: any = {};
    if (typeof filter?.companyId === 'number') where.companyId = filter.companyId;
    if (typeof filter?.employeeId === 'number') where.employeeId = filter.employeeId;
    return this.prisma.document.findMany({ where, orderBy: { uploadedAt: 'desc' } });
  }

  findOne(id: number) {
    return this.prisma.document.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return this.prisma.document.update({ where: { id }, data: updateDocumentDto });
  }

  async remove(id: number) {
    // get the document to know file path
    const doc = await this.prisma.document.findUnique({ where: { id } });
    const deleted = await this.prisma.document.delete({ where: { id } });
    // best-effort: remove file from disk if present
    if (doc?.path) {
      try {
        const { existsSync, unlinkSync } = await import('fs');
        if (existsSync(doc.path)) unlinkSync(doc.path);
      } catch {}
    }
    return deleted;
  }
}
