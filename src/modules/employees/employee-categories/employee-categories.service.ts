// filepath: sae-backend/src/modules/employees/employee-categories/employee-categories.service.ts
import { Injectable } from "@nestjs/common";
import { CreateEmployeeCategoryDto } from "./dto/create-employee-category.dto";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";

@Injectable()
export class EmployeeCategoriesService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.employeeCategory;
  }

  protected buildSearchConditions(q: string) {
    return [{ name: { contains: q } }, { description: { contains: q } }];
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    // Extract search query
    const q = query.q;

    // Build search conditions
    const where: any = {
      //deletedAt: null, // Only return non-deleted brands
    };

    if (q) {
      where.OR = this.buildSearchConditions(q);
    }

    return super.findAll(query, where);
  }

  async create(dto: CreateEmployeeCategoryDto) {
    const category = await this.prisma.employeeCategory.create({
      data: dto as any,
    });
    return { data: category };
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.employeeCategory.delete({ where: { id } });
    return { message: "Employee category deleted successfully" };
  }
}
