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
    // Create company with nested address if provided
    const company = await this.prisma.company.create({
      data: {
        name: createCompanyDto.name,
        businessName: createCompanyDto.businessName,
        taxId: createCompanyDto.taxId,
        information: createCompanyDto.notes,
        businessCategoryId: createCompanyDto.businessCategoryId
          ? parseInt(createCompanyDto.businessCategoryId)
          : undefined,
        addresses: createCompanyDto.address
          ? {
              create: {
                street: createCompanyDto.address.street,
                number: createCompanyDto.address.city, // Using city as number placeholder
                floor: createCompanyDto.address.state,
                apartment: createCompanyDto.address.postalCode,
                cityId: 1, // Default city ID, should be properly mapped
              },
            }
          : undefined,
      },
      include: {
        addresses: true,
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
        businessCategory: true,
        contacts: true,
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

    // Update company and address if provided
    const company = await this.prisma.company.update({
      where: { id: parseInt(id) },
      data: {
        name: updateCompanyDto.name,
        businessName: updateCompanyDto.businessName,
        taxId: updateCompanyDto.taxId,
        information: updateCompanyDto.notes,
        businessCategoryId: updateCompanyDto.businessCategoryId
          ? parseInt(updateCompanyDto.businessCategoryId)
          : undefined,
        addresses: updateCompanyDto.address
          ? {
              create: {
                street: updateCompanyDto.address.street,
                number: updateCompanyDto.address.city,
                floor: updateCompanyDto.address.state,
                apartment: updateCompanyDto.address.postalCode,
                cityId: 1, // Default city ID, should be properly mapped
              },
            }
          : undefined,
      },
      include: {
        addresses: true,
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

  async findBusinessCategories() {
    return this.prisma.businessCategory.findMany({
      include: {
        subCategories: true,
      },
    });
  }

  async findBusinessSubCategories(categoryId: string) {
    return this.prisma.businessSubCategory.findMany({
      where: {
        businessCategoryId: parseInt(categoryId),
      },
    });
  }
}
