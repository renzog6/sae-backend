// filepath: sae-backend/src/companies/companies.service.ts
import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import {
  PaginationDto,
  PaginatedResponseDto,
} from "../common/dto/pagination.dto";

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);

  constructor(private prisma: PrismaService) {}

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

    return company;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit, skip } = paginationDto;

    const [companies, total] = await Promise.all([
      this.prisma.company.findMany({
        skip,
        take: limit,
        include: {
          addresses: true,
          contacts: true,
          businessCategory: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      this.prisma.company.count(),
    ]);

    return new PaginatedResponseDto(companies, total, page, limit);
  }

  async findOne(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id: parseInt(id) },
      include: {
        addresses: true,
        contacts: true,
        businessCategory: true,
      },
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
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

    return company;
  }

  async remove(id: string) {
    // Check if company exists
    await this.findOne(id);

    // Delete company (cascade delete will handle address)
    await this.prisma.company.delete({
      where: { id: parseInt(id) },
    });

    return { id };
  }

  
}
