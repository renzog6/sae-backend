import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { EmployeeCategory } from "./entities/employee-category.entity";

@Injectable()
export class EmployeeCategoriesService extends BaseService<EmployeeCategory> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.employeeCategory;
  }

  protected buildSearchConditions(q: string) {
    return [{ name: { contains: q } }, { description: { contains: q } }];
  }
}

