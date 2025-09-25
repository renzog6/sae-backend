import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeStatus } from '@prisma/client';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: {
        information: dto.information,
        status: (dto.status ?? EmployeeStatus.ACTIVE) as any,
        hireDate: new Date(dto.hireDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        company: dto.companyId ? { connect: { id: dto.companyId } } : undefined,
        category: { connect: { id: dto.categoryId } },
        position: { connect: { id: dto.positionId } },
        person: { connect: { id: dto.personId } },
      },
      include: { company: true, category: true, position: true, person: true, vacations: true },
    });
  }

  async findAll(pagination?: PaginationDto) {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.employee.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: { company: true, category: true, position: true, person: true, vacations: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.employee.count(),
    ]);
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const emp = await this.prisma.employee.findUnique({
      where: { id },
      include: { company: true, category: true, position: true, person: true, vacations: true },
    });
    if (!emp) throw new NotFoundException(`Employee with ID ${id} not found`);
    return emp;
  }

  async update(id: number, dto: UpdateEmployeeDto) {
    await this.findOne(id);
    return this.prisma.employee.update({
      where: { id },
      data: {
        ...(typeof dto.information !== 'undefined' ? { information: dto.information } : {}),
        ...(typeof dto.status !== 'undefined' ? { status: dto.status as any } : {}),
        ...(typeof dto.hireDate !== 'undefined' ? { hireDate: new Date(dto.hireDate as any) } : {}),
        ...(typeof dto.endDate !== 'undefined' ? { endDate: dto.endDate ? new Date(dto.endDate as any) : null } : {}),
        ...(typeof dto.companyId !== 'undefined' ? { company: dto.companyId ? { connect: { id: dto.companyId } } : { disconnect: true } } : {}),
        ...(typeof dto.categoryId !== 'undefined' ? { category: { connect: { id: dto.categoryId! } } } : {}),
        ...(typeof dto.positionId !== 'undefined' ? { position: { connect: { id: dto.positionId! } } } : {}),
        ...(typeof dto.personId !== 'undefined' ? { person: { connect: { id: dto.personId! } } } : {}),
      },
      include: { company: true, category: true, position: true, person: true, vacations: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.employee.delete({ where: { id } });
    return { id };
  }
}