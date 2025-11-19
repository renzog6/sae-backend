//filepath: sae-backend/src/modules/employees/employee-positions/employee-positions.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEmployeePositionDto } from "./dto/create-employee-position.dto";
import { UpdateEmployeePositionDto } from "./dto/update-employee-position.dto";
import { PrismaService } from "@prisma/prisma.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";

@Injectable()
export class EmployeePositionsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateEmployeePositionDto) {
    return this.prisma.employeePosition.create({ data: dto as any });
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

  async findOne(id: number) {
    const pos = await this.prisma.employeePosition.findUnique({
      where: { id },
    });
    if (!pos)
      throw new NotFoundException(`EmployeePosition with ID ${id} not found`);
    return pos;
  }

  async update(id: number, dto: UpdateEmployeePositionDto) {
    await this.findOne(id);
    return this.prisma.employeePosition.update({
      where: { id },
      data: dto as any,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.employeePosition.delete({ where: { id } });
    return { id };
  }
}
