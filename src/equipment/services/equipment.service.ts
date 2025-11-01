// filepath: src/equipment/services/equipment.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateEquipmentDto } from "../dto/create-equipment.dto";
import { UpdateEquipmentDto } from "../dto/update-equipment.dto";

@Injectable()
export class EquipmentService {
  constructor(private readonly prisma: PrismaService) {}

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
  async findAll(query: {
    typeId?: number;
    modelId?: number;
    categoryId?: number;
    year?: number;
    status?: string;
    skip?: number;
    take?: number;
    search?: string;
  }) {
    const {
      typeId,
      modelId,
      categoryId,
      year,
      status,
      skip = 0,
      take = 25,
      search,
    } = query;

    const where: any = {};

    if (typeId) where.model = { typeId };
    if (modelId) where.modelId = modelId;
    if (categoryId) where.categoryId = categoryId;
    if (year) where.year = year;
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { licensePlate: { contains: search, mode: "insensitive" } },
        { internalCode: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.equipment.findMany({
        where,
        include: this.equipmentIncludes,
        skip,
        take,
        orderBy: { name: "asc" },
      }),
      this.prisma.equipment.count({ where }),
    ]);

    return {
      data: items,
      meta: {
        total,
        skip,
        take,
        pages: Math.ceil(total / take),
      },
    };
  }

  /**
   * 🔎 Obtiene un equipo por ID con sus relaciones
   */
  async findOne(id: number) {
    const equipment = await this.prisma.equipment.findUnique({
      where: { id },
      include: this.equipmentIncludes,
    });
    if (!equipment)
      throw new NotFoundException(`Equipment with id ${id} not found`);
    return equipment;
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
  async remove(id: number) {
    const equipment = await this.prisma.equipment.findUnique({ where: { id } });
    if (!equipment)
      throw new NotFoundException(`Equipment with id ${id} not found`);

    return this.prisma.equipment.delete({ where: { id } });
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
