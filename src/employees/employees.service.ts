/**
 * @fileoverview Service for managing employee operations in the SAE (Sistema de Administración Empresarial) system
 * @version 1.0.0
 * @author SAE Development Team
 * @since 2024
 *
 * This service handles all employee-related business logic including:
 * - Employee creation with automatic history logging
 * - Employee data retrieval with filtering and pagination
 * - Employee updates with history tracking
 * - Employee deletion (soft delete)
 * - Search functionality across multiple employee fields
 *
 * @extends BaseService
 * @example
 * // Creating a new employee
 * const newEmployee = await employeesService.create({
 *   employeeCode: 'EMP001',
 *   hireDate: '2024-01-15',
 *   categoryId: 1,
 *   positionId: 2,
 *   personId: 3
 * });
 *
 * // Finding all active employees
 * const employees = await employeesService.findAll({
 *   status: EmployeeStatus.ACTIVE,
 *   page: 1,
 *   limit: 10
 * });
 */

// filepath: sae-backend/src/employees/employees.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BaseService } from "../common/services/base.service";
import { BaseResponseDto } from "../common/dto/base-query.dto";
import { EmployeeQueryDto } from "./dto/employee-query.dto";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { EmployeeStatus, HistoryType, SeverityLevel } from "@prisma/client";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { HistoryLogService } from "../history/services/history-log.service";

@Injectable()
export class EmployeesService extends BaseService<any> {
  /**
   * Constructs the EmployeesService
   * @param prisma - Prisma service for database operations
   * @param historyLogService - Service for logging employee history events
   */
  constructor(
    prisma: PrismaService,
    private historyLogService: HistoryLogService
  ) {
    super(prisma);
  }

  /**
   * Returns the Prisma employee model for base service operations
   * @protected
   * @returns {any} Prisma employee model
   */
  protected getModel() {
    return this.prisma.employee;
  }

  /**
   * Builds search conditions for employee queries
   * Searches across employee code, person's last name, first name, and CUIL
   * @protected
   * @param q - Search query string
   * @returns {Array} Array of Prisma search conditions
   */
  protected buildSearchConditions(q: string) {
    return [
      { employeeCode: { contains: q } },
      { person: { is: { lastName: { contains: q } } } },
      { person: { is: { firstName: { contains: q } } } },
      { person: { is: { cuil: { contains: q } } } },
    ];
  }

  /**
   * Creates a new employee in the system
   * Automatically creates a history log entry for the employee hire
   * @param dto - Employee creation data
   * @returns {Promise<any>} Created employee with related data
   * @throws {PrismaClientKnownRequestError} When database constraints are violated
   *
   * @example
   * // Basic employee creation
   * const employee = await employeesService.create({
   *   employeeCode: 'EMP001',
   *   hireDate: '2024-01-15',
   *   categoryId: 1,
   *   positionId: 2,
   *   personId: 3
   * });
   *
   * // Employee with optional fields
   * const employee = await employeesService.create({
   *   employeeCode: 'EMP002',
   *   information: 'Senior developer with 5 years experience',
   *   status: EmployeeStatus.ACTIVE,
   *   hireDate: '2024-01-15',
   *   companyId: 1,
   *   categoryId: 1,
   *   positionId: 2,
   *   personId: 4
   * });
   */
  async create(dto: CreateEmployeeDto) {
    const employee = await this.prisma.employee.create({
      data: {
        employeeCode: dto.employeeCode,
        information: dto.information,
        status: (dto.status ?? EmployeeStatus.ACTIVE) as any,
        hireDate: new Date(dto.hireDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        company: dto.companyId ? { connect: { id: dto.companyId } } : undefined,
        category: { connect: { id: dto.categoryId } },
        position: { connect: { id: dto.positionId } },
        person: { connect: { id: dto.personId } },
      },
      include: {
        company: true,
        category: true,
        position: true,
        person: true,
        vacations: true,
      },
    });

    // Create history log for employee hire
    await this.historyLogService.createLog({
      title: `Nuevo empleado contratado`,
      description: `${employee.person.firstName} ${employee.person.lastName} comenzó a trabajar en la empresa`,
      type: HistoryType.EMPLOYEE_HIRE,
      severity: SeverityLevel.SUCCESS,
      eventDate: employee.hireDate,
      employeeId: employee.id,
      metadata: JSON.stringify({
        hireDate: employee.hireDate.toISOString(),
        employeeCode: employee.employeeCode,
        category: employee.category?.name,
        position: employee.position?.name,
      }),
    });

    return employee;
  }

  /**
   * Retrieves all employees with optional filtering and pagination
   * Supports status-based filtering and includes related employee data
   * Overrides BaseService to handle relation field sorting properly
   * @param query - Query parameters for filtering, pagination, and sorting
   * @returns {Promise<BaseResponseDto<any>>} Paginated employee list with metadata
   *
   * @example
   * // Get all active employees
   * const result = await employeesService.findAll({
   *   status: EmployeeStatus.ACTIVE
   * });
   *
   * // Get employees with search and pagination
   * const result = await employeesService.findAll({
   *   q: 'John',
   *   page: 1,
   *   limit: 10,
   *   sortBy: 'person.lastName',
   *   sortOrder: 'asc'
   * });
   */
  async findAll(
    query: EmployeeQueryDto = new EmployeeQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q, sortBy, sortOrder } = query;

    // ✅ Build additional filters
    const additionalWhere: any = {};
    if (query.status) {
      additionalWhere.status = query.status;
    }

    // ✅ Check for soft deletes
    const modelFields = this.getModel().fields || {};
    const hasDeletedAt = "deletedAt" in modelFields;

    // ✅ Build WHERE clause
    const where: any = {
      ...(hasDeletedAt ? { deletedAt: null } : {}),
      ...additionalWhere,
    };

    // ✅ Add search filter if provided
    if (q) {
      const searchConditions = this.buildSearchConditions(q);
      if (searchConditions && searchConditions.length > 0) {
        where.OR = searchConditions;
      }
    }

    // ✅ Build ORDER BY with proper relation field handling
    const orderBy = this.buildOrderBy(sortBy, sortOrder);

    // ✅ Include relations
    const include = {
      company: true,
      category: true,
      position: true,
      person: true,
      vacations: true,
    };

    // ✅ Execute query with transaction
    const findManyOptions: any = {
      where,
      skip,
      take,
      orderBy,
      include,
    };

    const [data, total] = await this.prisma.$transaction([
      this.getModel().findMany(findManyOptions),
      this.getModel().count({ where }),
    ]);

    return new BaseResponseDto(data, total, query.page || 1, query.limit || 10);
  }

  /**
   * Build orderBy object for Prisma with proper relation field handling
   * @protected
   * @param sortBy - Field to sort by
   * @param sortOrder - Sort direction
   * @returns {Object} Prisma orderBy object
   */
  protected buildOrderBy(sortBy?: string, sortOrder?: "asc" | "desc") {
    if (!sortBy) {
      return { createdAt: sortOrder || "desc" };
    }

    // ✅ MANEJAR campos de relación correctamente
    switch (sortBy) {
      case "person.lastName":
        return {
          person: {
            lastName: sortOrder || "asc",
          },
        };
      case "person.firstName":
        return {
          person: {
            firstName: sortOrder || "asc",
          },
        };
      case "person.cuil":
        return {
          person: {
            cuil: sortOrder || "asc",
          },
        };
      // Para campos directos del empleado
      case "employeeCode":
      case "hireDate":
      case "status":
      case "createdAt":
      case "updatedAt":
        return {
          [sortBy]: sortOrder || "asc",
        };
      // Campo por defecto
      default:
        return { createdAt: sortOrder || "desc" };
    }
  }

  /**
   * Retrieves a single employee by ID with all related data
   * @param id - Employee ID
   * @returns {Promise<any>} Employee with related company, category, position, person, and vacation data
   * @throws {NotFoundException} When employee with specified ID is not found
   *
   * @example
   * const employee = await employeesService.findOne(123);
   */
  async findOne(id: number) {
    const include = {
      company: true,
      category: true,
      position: true,
      person: true,
      vacations: true,
    };

    return super.findOne(id, include);
  }

  /**
   * Updates an existing employee with the provided data
   * Only updates fields that are explicitly provided in the DTO
   * @param id - Employee ID to update
   * @param dto - Update data
   * @returns {Promise<any>} Updated employee with related data
   * @throws {NotFoundException} When employee with specified ID is not found
   *
   * @example
   * // Update employee status
   * const updated = await employeesService.update(123, {
   *   status: EmployeeStatus.INACTIVE
   * });
   *
   * // Update multiple fields
   * const updated = await employeesService.update(123, {
   *   employeeCode: 'EMP002',
   *   positionId: 3,
   *   information: 'Updated information'
   * });
   */
  async update(id: number, dto: UpdateEmployeeDto) {
    await this.findOne(id);
    return this.prisma.employee.update({
      where: { id },
      data: {
        ...(typeof dto.employeeCode !== "undefined"
          ? { employeeCode: dto.employeeCode }
          : {}),
        ...(typeof dto.information !== "undefined"
          ? { information: dto.information }
          : {}),
        ...(typeof dto.status !== "undefined"
          ? { status: dto.status as any }
          : {}),
        ...(typeof dto.hireDate !== "undefined"
          ? { hireDate: new Date(dto.hireDate as any) }
          : {}),
        ...(typeof dto.endDate !== "undefined"
          ? { endDate: dto.endDate ? new Date(dto.endDate as any) : null }
          : {}),
        ...(typeof dto.companyId !== "undefined"
          ? {
              company: dto.companyId
                ? { connect: { id: dto.companyId } }
                : { disconnect: true },
            }
          : {}),
        ...(typeof dto.categoryId !== "undefined"
          ? { category: { connect: { id: dto.categoryId! } } }
          : {}),
        ...(typeof dto.positionId !== "undefined"
          ? { position: { connect: { id: dto.positionId! } } }
          : {}),
        ...(typeof dto.personId !== "undefined"
          ? { person: { connect: { id: dto.personId! } } }
          : {}),
      },
      include: {
        company: true,
        category: true,
        position: true,
        person: true,
        vacations: true,
      },
    });
  }

  /**
   * Removes an employee from the system (soft delete)
   * @param id - Employee ID to remove
   * @returns {Promise<{message: string}>} Success message
   * @throws {NotFoundException} When employee with specified ID is not found
   *
   * @example
   * const result = await employeesService.remove(123);
   * console.log(result.message); // "Record deleted successfully"
   */
  async remove(id: number): Promise<{ message: string }> {
    return await super.remove(id);
  }
}
