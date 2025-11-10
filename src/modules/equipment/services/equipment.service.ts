// filepath: sae-backend/src/modules/equipment/services/equipment.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseResponseDto } from "@common/dto/base-query.dto";
import { EquipmentQueryDto } from "../dto/equipment-query.dto";
import { CreateEquipmentDto } from "../dto/create-equipment.dto";
import { UpdateEquipmentDto } from "../dto/update-equipment.dto";

@Injectable()
export class EquipmentService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.equipment;
  }

  protected buildSearchConditions(q: string) {
    return [
      { licensePlate: { contains: q } },
      { internalCode: { contains: q } },
      { description: { contains: q } },
      { name: { contains: q } },
    ];
  }

  /**
   * 🔁 Centraliza todas las relaciones que suelen incluirse
   * para mantener consistencia entre consultas.
   */
  private equipmentIncludes = {
    type: true,
    model: {
      include: { type: true, brand: true },
    },
    category: true,
    EquipmentAxle: {
      include: {
        tirePositions: true,
      },
    },
  };

  /**
   * 🧩 Crea un nuevo equipo con validación de referencias
   */
  async create(data: CreateEquipmentDto) {
    const { modelId, categoryId } = data;

    // ✅ Validación de referencias existentes
    const [model, category] = await Promise.all([
      this.prisma.equipmentModel.findUnique({ where: { id: modelId } }),
      this.prisma.equipmentCategory.findUnique({ where: { id: categoryId } }),
    ]);

    if (!model)
      throw new BadRequestException(`Model with id ${modelId} not found`);
    if (!category)
      throw new BadRequestException(`Category with id ${categoryId} not found`);

    return this.prisma.equipment.create({
      data,
      include: this.equipmentIncludes,
    });
  }

  /**
   * 🔍 Obtiene lista de equipos con filtros dinámicos + paginación
   *
   * Soporta filtros: typeId, modelId, categoryId, year, status
   */
  async findAll(
    query: EquipmentQueryDto = new EquipmentQueryDto(),
    typeId?: number,
    modelId?: number,
    categoryId?: number,
    year?: number
  ): Promise<BaseResponseDto<any>> {
    const additionalWhere: any = {};

    if (typeId) additionalWhere.model = { typeId };
    if (modelId) additionalWhere.modelId = modelId;
    if (categoryId) additionalWhere.categoryId = categoryId;
    if (year) additionalWhere.year = year;
    if (query.status) additionalWhere.status = query.status;

    return super.findAll(query, additionalWhere, this.equipmentIncludes);
  }

  /**
   * 🔎 Obtiene un equipo por ID con sus relaciones
   */
  async findOne(id: number) {
    return super.findOne(id, this.equipmentIncludes);
  }

  /**
   * ✏️ Actualiza un equipo con validación de referencias
   */
  async update(id: number, data: UpdateEquipmentDto) {
    const equipment = await this.prisma.equipment.findUnique({ where: { id } });
    if (!equipment)
      throw new NotFoundException(`Equipment with id ${id} not found`);

    // Valida referencias solo si fueron provistas
    if (data.modelId) {
      const modelExists = await this.prisma.equipmentModel.findUnique({
        where: { id: data.modelId },
      });
      if (!modelExists)
        throw new BadRequestException(
          `Model with id ${data.modelId} not found`
        );
    }

    if (data.categoryId) {
      const categoryExists = await this.prisma.equipmentCategory.findUnique({
        where: { id: data.categoryId },
      });
      if (!categoryExists)
        throw new BadRequestException(
          `Category with id ${data.categoryId} not found`
        );
    }

    return this.prisma.equipment.update({
      where: { id },
      data,
      include: this.equipmentIncludes,
    });
  }

  /**
   * 🗑️ Elimina un equipo por ID
   */
  async remove(id: number): Promise<{ message: string }> {
    return await super.remove(id);
  }

  // -------------------------------------------------------------------------
  // CATEGORY METHODS
  // -------------------------------------------------------------------------
  async findCategories() {
    return this.prisma.equipmentCategory.findMany({
      include: {
        types: true, // si tu modelo Category tiene relación 1:N con EquipmentType
      },
      orderBy: { id: "asc" },
    });
  }

  async findCategory(id: number) {
    const category = await this.prisma.equipmentCategory.findUnique({
      where: { id },
      include: {
        types: {
          include: { models: true },
        },
      },
    });
    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);
    return category;
  }

  // -------------------------------------------------------------------------
  // TYPE METHODS
  // -------------------------------------------------------------------------
  async findTypes(categoryId?: number) {
    const where = categoryId ? { categoryId } : {};
    return this.prisma.equipmentType.findMany({
      where,
      include: {
        category: true,
        models: true,
      },
      orderBy: { id: "asc" },
    });
  }

  async findType(id: number) {
    const type = await this.prisma.equipmentType.findUnique({
      where: { id },
      include: {
        category: true,
        models: true,
      },
    });
    if (!type) throw new NotFoundException(`Type with id ${id} not found`);
    return type;
  }

  // -------------------------------------------------------------------------
  // MODEL METHODS
  // -------------------------------------------------------------------------
  async findModels(typeId?: number) {
    const where = typeId ? { typeId } : {};
    return this.prisma.equipmentModel.findMany({
      where,
      include: {
        type: {
          include: { category: true },
        },
      },
      orderBy: { id: "asc" },
    });
  }

  async findModel(id: number) {
    const model = await this.prisma.equipmentModel.findUnique({
      where: { id },
      include: {
        type: {
          include: { category: true },
        },
      },
    });
    if (!model) throw new NotFoundException(`Model with id ${id} not found`);
    return model;
  }
}
