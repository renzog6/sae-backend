import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeCategoryDto } from './dto/create-employee-category.dto';
import { UpdateEmployeeCategoryDto } from './dto/update-employee-category.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class EmployeeCategoriesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateEmployeeCategoryDto) {
    return this.prisma.employeeCategory.create({ data: dto as any });
  }

  async findAll(pagination?: PaginationDto) {
    const page = pagination?.page ?? 1;
    const limit = pagination?.limit ?? 10;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.employeeCategory.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.employeeCategory.count(),
    ]);
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: number) {
    const cat = await this.prisma.employeeCategory.findUnique({ where: { id } });
    if (!cat) throw new NotFoundException(`EmployeeCategory with ID ${id} not found`);
    return cat;
  }

  async update(id: number, dto: UpdateEmployeeCategoryDto) {
    await this.findOne(id);
    return this.prisma.employeeCategory.update({ where: { id }, data: dto as any });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.employeeCategory.delete({ where: { id } });
    return { id };
  }
}
