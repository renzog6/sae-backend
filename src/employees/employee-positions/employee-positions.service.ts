import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeePositionDto } from './dto/create-employee-position.dto';
import { UpdateEmployeePositionDto } from './dto/update-employee-position.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class EmployeePositionsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateEmployeePositionDto) {
    return this.prisma.employeePosition.create({ data: dto as any });
  }

  async findAll(pagination?: PaginationDto) {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.employeePosition.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.employeePosition.count(),
    ]);
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const pos = await this.prisma.employeePosition.findUnique({ where: { id } });
    if (!pos) throw new NotFoundException(`EmployeePosition with ID ${id} not found`);
    return pos;
  }

  async update(id: number, dto: UpdateEmployeePositionDto) {
    await this.findOne(id);
    return this.prisma.employeePosition.update({ where: { id }, data: dto as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.employeePosition.delete({ where: { id } });
    return { id };
  }
}
