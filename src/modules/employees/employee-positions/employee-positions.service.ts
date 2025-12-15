//filepath: sae-backend/src/modules/employees/employee-positions/employee-positions.service.ts
import { Injectable } from "@nestjs/common";
import { CreateEmployeePositionDto } from "./dto/create-employee-position.dto";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";

@Injectable()
export class EmployeePositionsService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.employeePosition;
  }

  protected buildSearchConditions(q: string) {
    return [{ name: { contains: q } }, { description: { contains: q } }];
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    // Extract search query
    const q = query.q;

    // Default sort
    query.sortBy = query.sortBy ?? "name";
    query.sortOrder = query.sortOrder ?? "asc";

    // Build search conditions
    const where: any = {
      //deletedAt: null, // Only return non-deleted brands
    };

    if (q) {
      where.OR = this.buildSearchConditions(q);
    }

    return super.findAll(query, where);
  }

  async create(dto: CreateEmployeePositionDto) {
    const position = await this.prisma.employeePosition.create({
      data: dto as any,
    });
    return { data: position };
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.employeePosition.delete({ where: { id } });
    return { message: "Employee position deleted successfully" };
  }
}
