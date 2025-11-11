// filepath: sae-backend/src/modules/companies/business-subcategories/business-subcategories.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { CreateBusinessSubCategoryDto } from "./dto/create-business-subcategory.dto";
import { UpdateBusinessSubCategoryDto } from "./dto/update-business-subcategory.dto";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";

@Injectable()
export class BusinessSubcategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBusinessSubCategoryDto: CreateBusinessSubCategoryDto) {
    const { name, description, businessCategoryId } =
      createBusinessSubCategoryDto;
    return this.prisma.businessSubCategory.create({
      data: {
        name,
        description,
        businessCategoryId,
      },
    });
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    // For compatibility with client-side filtering, get all subcategories (no pagination)
    // This matches the pattern used in other modules like equipment
    const q = query.q;

    // Build search conditions
    const where: any = {
      deletedAt: null, // Only return non-deleted subcategories
    };

    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { businessCategory: { name: { contains: q, mode: "insensitive" } } },
      ];
    }

    // Get all subcategories without pagination for client-side filtering
    const subcategories = await this.prisma.businessSubCategory.findMany({
      where,
      include: {
        businessCategory: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: {
        name: "asc", // Always sort by name ascending
      },
    });

    // Return in a compatible format
    return new BaseResponseDto(
      subcategories,
      subcategories.length,
      1,
      subcategories.length
    );
  }

  async findOne(id: number) {
    const subcategory = await this.prisma.businessSubCategory.findFirst({
      where: {
        id,
        deletedAt: null, // Don't return deleted subcategories
      },
      include: {
        businessCategory: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
    if (!subcategory) {
      throw new NotFoundException(
        `BusinessSubCategory with id ${id} not found`
      );
    }
    return subcategory;
  }

  async update(
    id: number,
    updateBusinessSubCategoryDto: UpdateBusinessSubCategoryDto
  ) {
    // Ensure subcategory exists and is not deleted
    await this.findOne(id);
    return this.prisma.businessSubCategory.update({
      where: { id },
      data: updateBusinessSubCategoryDto,
    });
  }

  async remove(id: number) {
    // Soft delete: set both isActive to false and deletedAt
    // Ensure subcategory exists
    await this.findOne(id);
    return this.prisma.businessSubCategory.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });
  }

  async restore(id: number) {
    // Restore: set isActive to true and clear deletedAt
    // Ensure subcategory exists (even if deleted)
    const subcategory = await this.prisma.businessSubCategory.findUnique({
      where: { id },
    });
    if (!subcategory) {
      throw new NotFoundException(
        `BusinessSubCategory with id ${id} not found`
      );
    }

    return this.prisma.businessSubCategory.update({
      where: { id },
      data: {
        isActive: true,
        deletedAt: null,
      },
    });
  }
}
