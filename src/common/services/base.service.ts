// filepath: sae-backend/src/common/services/base.service.ts
import { NotFoundException, Logger } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseQueryDto, BaseResponseDto, SingleResponseDto } from "@common/dto";
/**
 * BaseService abstracto pensado para trabajar con PrismaService.
 *
 * Requisitos:
 * - Los servicios concretos deben implementar getModel() devolviendo
 *   el cliente del modelo de prisma (ej: this.prisma.user)
 *
 * Soft delete:
 * - Detecta si existe deletedAt intentando seleccionar el campo (solo la primera vez).
 * - Cachea la detección para evitar introspecciones repetidas.
 */
export abstract class BaseService<T extends { id: number | string }> {
  protected readonly logger = new Logger(this.constructor.name);
  private _hasDeletedAt?: boolean | null = undefined;

  constructor(protected readonly prisma: PrismaService) {}

  // --- Cada servicio concreto debe devolver el model prisma: e.g. return this.prisma.user;
  protected abstract getModel(): any;

  // --- Introspección (cacheada) para saber si el modelo tiene deletedAt
  protected async hasDeletedAt(): Promise<boolean> {
    if (this._hasDeletedAt !== undefined && this._hasDeletedAt !== null) {
      return this._hasDeletedAt;
    }

    try {
      // intentamos hacer un select a deletedAt; si no existe, prisma lanzará
      await this.getModel().findFirst({
        select: { deletedAt: true as any },
        take: 1,
      });
      this._hasDeletedAt = true;
    } catch (err) {
      // Si falla, asumimos que no existe el campo
      this._hasDeletedAt = false;
    }

    return this._hasDeletedAt;
  }

  // --- Buscar muchos con paginación, search y soft-delete handling
  async findAll(
    query: BaseQueryDto = new BaseQueryDto(),
    additionalWhere: any = {},
    include?: any
  ): Promise<BaseResponseDto<T>> {
    const { skip, take, q, sortBy, sortOrder, page, limit, deleted } = query;
    const hasDeletedAt = await this.hasDeletedAt();

    // Base where object
    const where: any = { ...additionalWhere };

    // Soft delete behavior
    if (hasDeletedAt) {
      if (deleted === "exclude") {
        where.deletedAt = null;
      } else if (deleted === "only") {
        where.deletedAt = { not: null };
      } // include => no filtro
    }

    // Search (overrideable)
    if (q) {
      const searchConditions = this.buildSearchConditions(q);
      if (searchConditions && searchConditions.length > 0) {
        where.OR = searchConditions;
      }
    }

    const orderBy = sortBy ? { [sortBy]: sortOrder } : { id: "desc" };

    // Detectar "no pagination"
    const noPagination = Number(limit) === 0;

    const findManyOptions: any = {
      where,
      orderBy,
      skip: noPagination ? undefined : skip,
      take: noPagination ? undefined : take,
    };

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

    // Si limit=0 => devolver todos los resultados y page=1
    return new BaseResponseDto<T>(
      data,
      total,
      noPagination ? 1 : page || 1,
      noPagination ? total : limit || take || 10
    );
  }

  // --- Buscar uno (respetando soft delete)
  async findOne(
    id: number | string,
    include?: any,
    { includeDeleted = false } = {}
  ): Promise<SingleResponseDto<T>> {
    const hasDeletedAt = await this.hasDeletedAt();

    const findOptions: any = {
      where: { id },
    };

    if (hasDeletedAt && !includeDeleted) {
      findOptions.where.deletedAt = null;
    }

    if (include) findOptions.include = include;

    const record = await this.getModel().findUnique(findOptions);

    if (!record) {
      const entityName = this.constructor.name.replace("Service", "");
      throw new NotFoundException(`${entityName} with ID ${id} not found`);
    }

    return new SingleResponseDto<T>(record);
  }

  // --- Create
  async create(data: any): Promise<{ data: T }> {
    const record = await this.getModel().create({ data });
    return { data: record };
  }

  // --- Update
  async update(id: number | string, data: any): Promise<{ data: T }> {
    await this.findOne(id); // throws if not exists
    const record = await this.getModel().update({ where: { id }, data });
    return { data: record };
  }

  // --- Soft delete (si es soportado), o hard delete si no existe deletedAt
  async remove(id: number | string): Promise<{ message: string }> {
    const hasDeletedAt = await this.hasDeletedAt();
    await this.findOne(id); // ensure exists (respects soft delete)

    if (hasDeletedAt) {
      await this.getModel().update({
        where: { id },
        data: { deletedAt: new Date(), isActive: false } as any,
      });
      return { message: "Record soft-deleted successfully" };
    } else {
      await this.getModel().delete({ where: { id } });
      return { message: "Record hard-deleted successfully" };
    }
  }

  // --- Restore soft-deleted
  async restore(id: number | string): Promise<{ data: T }> {
    const hasDeletedAt = await this.hasDeletedAt();

    if (!hasDeletedAt) {
      throw new NotFoundException("Restore not supported for this resource");
    }

    // allow restoring even if record is soft-deleted
    const record = await this.getModel().update({
      where: { id },
      data: { deletedAt: null, isActive: true } as any,
    });

    return { data: record };
  }

  // --- Hard delete explicit
  async hardDelete(id: number | string): Promise<{ message: string }> {
    await this.getModel().delete({ where: { id } });
    return { message: "Record permanently deleted" };
  }

  /**
   * Construir condiciones de búsqueda por defecto
   * Overridear en servicios concretos (ej: return [{ name: { contains: q, mode: 'insensitive' } }])
   */
  protected buildSearchConditions(q: string): any[] {
    return [];
  }
}
