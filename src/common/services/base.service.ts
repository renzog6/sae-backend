import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { BaseQueryDto, BaseResponseDto } from "../dto/base-query.dto";

@Injectable()
export abstract class BaseService<T extends { id: number | string }> {
  protected prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  /**
   * Get the Prisma model for this service
   * Must be implemented by concrete services
   */
  protected abstract getModel(): any;

  /**
   * Standard findAll implementation with pagination, filtering, and soft deletes
   */
  async findAll(
    query: BaseQueryDto = new BaseQueryDto(),
    additionalWhere: any = {},
    include?: any
  ): Promise<BaseResponseDto<T>> {
    const { skip, take, q, sortBy, sortOrder } = query;

    // Check if model supports soft deletes
    const modelFields = this.getModel().fields || {};
    const hasDeletedAt = "deletedAt" in modelFields;

    console.log(
      `[BaseService] Model ${this.constructor.name} has deletedAt field: ${hasDeletedAt}`
    );

    const where: any = {
      ...(hasDeletedAt ? { deletedAt: null } : {}), // Soft delete filter only if field exists
      ...additionalWhere,
    };

    // Add search filter if provided
    if (q) {
      // Default search implementation - can be overridden by services
      const searchConditions = this.buildSearchConditions(q);
      if (searchConditions && searchConditions.length > 0) {
        where.OR = searchConditions;
      }
    }

    const orderBy = sortBy ? { [sortBy]: sortOrder } : { createdAt: "desc" };

    const findManyOptions: any = {
      where,
      skip,
      take,
      orderBy,
    };

    // Handle include/select properly - if include contains select, it's actually a select
    if (include) {
      if (include.select) {
        findManyOptions.select = include.select;
      } else {
        findManyOptions.include = include;
      }
    }

    const [data, total] = await this.prisma.$transaction([
      this.getModel().findMany(findManyOptions),
      this.getModel().count({ where }),
    ]);

    return new BaseResponseDto(data, total, query.page || 1, query.limit || 10);
  }

  /**
   * Build search conditions for findAll - can be overridden by services
   */
  protected buildSearchConditions(q: string): any[] {
    // Default implementation - services should override for specific searchable fields
    return [];
  }

  /**
   * Standard findOne implementation with error handling and optional includes
   */
  async findOne(id: number | string, include?: any): Promise<T> {
    // Check if model supports soft deletes
    const modelFields = this.getModel().fields || {};
    const hasDeletedAt = "deletedAt" in modelFields;

    console.log(
      `[BaseService] Model ${this.constructor.name} has deletedAt field: ${hasDeletedAt}`
    );

    const findOptions: any = {
      where: {
        id,
        ...(hasDeletedAt ? { deletedAt: null } : {}), // Soft delete filter only if field exists
      },
    };

    if (include) {
      findOptions.include = include;
    }

    const record = await this.getModel().findUnique(findOptions);

    if (!record) {
      const entityName = this.constructor.name.replace("Service", "");
      throw new NotFoundException(`${entityName} with ID ${id} not found`);
    }

    return record;
  }

  /**
   * Standard create implementation
   */
  async create(data: Partial<T>): Promise<T> {
    return this.getModel().create({ data });
  }

  /**
   * Standard update implementation
   */
  async update(id: number | string, data: Partial<T>): Promise<T> {
    await this.findOne(id); // Ensure exists
    return this.getModel().update({
      where: { id },
      data,
    });
  }

  /**
   * Standard remove implementation (soft delete)
   */
  async remove(id: number | string): Promise<void> {
    await this.findOne(id); // Ensure exists

    // Check if model supports soft deletes
    const modelFields = this.getModel().fields || {};
    const hasDeletedAt = "deletedAt" in modelFields;

    console.log(
      `[BaseService] Model ${this.constructor.name} has deletedAt field: ${hasDeletedAt}`
    );

    if (hasDeletedAt) {
      await this.getModel().update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } else {
      // Hard delete if no soft delete support
      await this.getModel().delete({
        where: { id },
      });
    }
  }
}
