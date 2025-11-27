//filepath: sae-backend/src/modules/employees/employee-positions/employee-positions.service.ts
import { Injectable } from "@nestjs/common";
import { CreateEmployeePositionDto } from "./dto/create-employee-position.dto";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";

@Injectable()
export class EmployeePositionsService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.employeePosition;
  }

  protected buildSearchConditions(q: string) {
    return [
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }

  async create(dto: CreateEmployeePositionDto) {
    const position = await this.prisma.employeePosition.create({
      data: dto as any,
    });
    return { data: position };
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
      this.prisma.employeePosition.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.employeePosition.count({ where }),
    ]);

    return new BaseResponseDto(data, total, query.page || 1, query.limit || 10);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.employeePosition.delete({ where: { id } });
    return { message: "Employee position deleted successfully" };
  }
}
