// filepath: sae-backend/src/modules/employees/employee-categories/employee-categories.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEmployeeCategoryDto } from "./dto/create-employee-category.dto";
import { UpdateEmployeeCategoryDto } from "./dto/update-employee-category.dto";
import { PrismaService } from "@prisma/prisma.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";

@Injectable()
export class EmployeeCategoriesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateEmployeeCategoryDto) {
    return this.prisma.employeeCategory.create({ data: dto as any });
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q, sortBy = "name", sortOrder = "asc" } = query;

    // Build search filter
    const where: any = {};
    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    // Get paginated data and total count in a single transaction
    const [data, total] = await this.prisma.$transaction([
      this.prisma.employeeCategory.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.employeeCategory.count({ where }),
    ]);

    return new BaseResponseDto(data, total, query.page || 1, query.limit || 10);
  }

  async findOne(id: number) {
    const cat = await this.prisma.employeeCategory.findUnique({
      where: { id },
    });
    if (!cat)
      throw new NotFoundException(`EmployeeCategory with ID ${id} not found`);
    return cat;
  }

  async update(id: number, dto: UpdateEmployeeCategoryDto) {
    await this.findOne(id);
    return this.prisma.employeeCategory.update({
      where: { id },
      data: dto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.employeeCategory.delete({ where: { id } });
    return { id };
  }
}
