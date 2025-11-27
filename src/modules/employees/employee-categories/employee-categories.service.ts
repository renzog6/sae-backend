// filepath: sae-backend/src/modules/employees/employee-categories/employee-categories.service.ts
import { Injectable } from "@nestjs/common";
import { CreateEmployeeCategoryDto } from "./dto/create-employee-category.dto";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";

@Injectable()
export class EmployeeCategoriesService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.employeeCategory;
  }

  protected buildSearchConditions(q: string) {
    return [
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }

  async create(dto: CreateEmployeeCategoryDto) {
    const category = await this.prisma.employeeCategory.create({
      data: dto as any,
    });
    return { data: category };
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

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.employeeCategory.delete({ where: { id } });
    return { message: "Employee category deleted successfully" };
  }
}
