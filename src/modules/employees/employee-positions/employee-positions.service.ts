import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";
import { EmployeePosition } from "./entities/employee-position.entity";

@Injectable()
export class EmployeePositionsService extends BaseService<EmployeePosition> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.employeePosition;
  }

  protected buildSearchConditions(q: string) {
    return [{ name: { contains: q } }, { description: { contains: q } }];
  }

  override async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    // Default sort
    query.sortBy = query.sortBy ?? "name";
    query.sortOrder = query.sortOrder ?? "asc";

    return super.findAll(query);
  }
}

