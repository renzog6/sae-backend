import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseResponseDto } from "@common/dto";
import { Equipment } from "./entities/equipment.entity";
import { EquipmentQueryDto } from "@modules/equipment/dto/equipment-query.dto";
import { CreateEquipmentDto } from "@modules/equipment/dto/create-equipment.dto";
import { UpdateEquipmentDto } from "@modules/equipment/dto/update-equipment.dto";

@Injectable()
export class EquipmentService extends BaseService<Equipment> {
  constructor(protected prisma: PrismaService) {
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

    const equipment = await this.prisma.equipment.create({
      data,
      include: this.equipmentIncludes,
    });
    return { data: equipment };
  }

  /**
   * 🔍 Obtiene lista de equipos con filtros dinámicos + paginación
   */
  override async findAll(
    query: EquipmentQueryDto = new EquipmentQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const additionalWhere: any = {};
    const { typeId, modelId, categoryId, year, status } = query;

    if (typeId) additionalWhere.typeId = typeId;
    if (modelId) additionalWhere.modelId = modelId;
    if (categoryId) additionalWhere.categoryId = categoryId;
    if (year) additionalWhere.year = year;
    if (status) additionalWhere.status = status;

    return super.findAll(query, additionalWhere, this.equipmentIncludes);
  }

  /**
   * 🔎 Obtiene un equipo por ID con sus relaciones
   */
  override async findOne(id: number) {
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

    const updatedEquipment = await this.prisma.equipment.update({
      where: { id },
      data,
      include: this.equipmentIncludes,
    });
    return { data: updatedEquipment };
  }
}
