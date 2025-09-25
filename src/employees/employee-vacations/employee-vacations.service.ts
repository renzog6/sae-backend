import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeVacationDto } from './dto/create-employee-vacation.dto';
import { UpdateEmployeeVacationDto } from './dto/update-employee-vacation.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class EmployeeVacationsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateEmployeeVacationDto) {
    return this.prisma.employeeVacation.create({
      data: {
        detail: dto.detail,
        days: dto.days,
        year: dto.year,
        information: dto.information,
        startDate: new Date(dto.startDate),
        settlementDate: new Date(dto.settlementDate),
        employee: { connect: { id: dto.employeeId } },
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
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.employeeVacation.count(),
    ]);
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const rec = await this.prisma.employeeVacation.findUnique({ where: { id }, include: { employee: true } });
    if (!rec) throw new NotFoundException(`EmployeeVacation with ID ${id} not found`);
    return rec;
  }

  async update(id: number, dto: UpdateEmployeeVacationDto) {
    await this.findOne(id);
    return this.prisma.employeeVacation.update({
      where: { id },
      data: {
        ...(typeof dto.detail !== 'undefined' ? { detail: dto.detail } : {}),
        ...(typeof dto.days !== 'undefined' ? { days: dto.days } : {}),
        ...(typeof dto.year !== 'undefined' ? { year: dto.year } : {}),
        ...(typeof dto.information !== 'undefined' ? { information: dto.information } : {}),
        ...(typeof (dto as any).employeeId !== 'undefined' ? { employee: { connect: { id: (dto as any).employeeId } } } : {}),
        ...(typeof (dto as any).startDate !== 'undefined' ? { startDate: new Date((dto as any).startDate) } : {}),
        ...(typeof (dto as any).settlementDate !== 'undefined' ? { settlementDate: new Date((dto as any).settlementDate) } : {}),
      },
      include: { employee: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.employeeVacation.delete({ where: { id } });
    return { id };
  }
}
