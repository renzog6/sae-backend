// filepath: sae-backend/src/modules/companies/services/companies.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseResponseDto } from "@common/dto";
import { GetCompaniesQueryDto } from "../dto/get-companies-query.dto";
import { CreateCompanyDto } from "../dto/create-company.dto";
import { UpdateCompanyDto } from "../dto/update-company.dto";

@Injectable()
export class CompaniesService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.company;
  }

  protected buildSearchConditions(q: string) {
    return [
      { name: { contains: q } },
      { businessName: { contains: q } },
      { cuit: { contains: q } },
    ];
  }

  async create(createCompanyDto: CreateCompanyDto) {
    // Create company: only base fields (relations handled separately)
    const company = await this.prisma.company.create({
      data: {
        cuit: createCompanyDto.cuit,
        name: createCompanyDto.name,
        businessName: createCompanyDto.businessName,
        information: createCompanyDto.information,
        businessCategoryId: createCompanyDto.businessCategoryId,
      },
      include: {
        businessCategory: true,
      },
    });

    return { data: company };
  }

  protected override getDefaultOrderBy() {
    return { businessName: "asc" };
  }

  async findAll(
    query: GetCompaniesQueryDto = new GetCompaniesQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const include = {
      addresses: true,
      contacts: true,
      businessCategory: true,
    };

    const where: any = {};

    if (query.businessCategoryId) {
      where.businessCategoryId = query.businessCategoryId;
    }

    return super.findAll(query, where, include);
  }

  async findOne(id: string) {
    const include = {
      addresses: true,
      contacts: true,
      businessCategory: true,
    };

    return super.findOne(parseInt(id), include);
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    // Check if company exists
    await this.findOne(id);

    // Update company
    const company = await this.prisma.company.update({
      where: { id: parseInt(id) },
      data: {
        cuit: updateCompanyDto.cuit,
        name: updateCompanyDto.name,
        businessName: updateCompanyDto.businessName,
        information: updateCompanyDto.information,
        businessCategoryId: updateCompanyDto.businessCategoryId,
      },
      include: {
        businessCategory: true,
      },
    });

    return { data: company };
  }

  async remove(id: string): Promise<{ message: string }> {
    return await super.remove(parseInt(id));
  }
}
