import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import {
  CreateEquipmentAxleDto,
  CreateEquipmentAxleWithPositionsDto,
} from "./dto/create-equipment-axle.dto";
import { EquipmentAxleQueryDto } from "./dto/equipment-axle-query.dto";
import { BaseResponseDto } from "@common/dto";
import { EquipmentAxle } from "./entity/equipment-axle.entity";

@Injectable()
export class EquipmentAxlesService extends BaseService<EquipmentAxle> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.equipmentAxle;
  }

  protected buildSearchConditions(q: string) {
    return [{ description: { contains: q } }];
  }

  async create(data: CreateEquipmentAxleDto) {
    const axle = await this.prisma.equipmentAxle.create({
      data,
      include: {
        equipment: true,
        tirePositions: true,
      },
    });
    return { data: axle };
  }

  override async findAll(
    query: EquipmentAxleQueryDto = new EquipmentAxleQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { equipmentId } = query;
    const additionalWhere: any = {};
    if (equipmentId) additionalWhere.equipmentId = equipmentId;

    // Use super.findAll but we need to inject our custom where logic
    // Actually BaseService doesn't accept extra where in arguments easily unless we override.
    // BaseService findAll signature: findAll(query, where = {}, include = undefined)

    // We construct the where object
    // Also we need to handle default sort if not provided
    query.sortBy = query.sortBy ?? "order";
    query.sortOrder = query.sortOrder ?? "asc";

    const include = {
      equipment: true,
      tirePositions: true,
    };

    return super.findAll(query, additionalWhere, include);
  }

  // Preserve update and remove if they have custom logic (findOne check and include)
  // BaseService update/remove calls findOne but maybe not with same includes.
  // The current update logic returns included relations. BaseService update returns specific result if overriden?
  // BaseService update returns { data: object }.
  // I'll override to ensure includes.

  // ... (Wait, I can just use BaseService update/remove if I don't care about includes in return for delete)
  // But Update returns the updated object with includes in current implementation.

  override async update(id: number, data: any) { // Type 'any' or DTO
    // BaseService signature: update(id, data)
    await this.findOne(id);
    const axle = await this.prisma.equipmentAxle.update({
      where: { id },
      data,
      include: {
        equipment: true,
        tirePositions: true,
      },
    });
    return { data: axle };
  }

  override async findOne(id: number) {
    const include = {
      equipment: true,
      tirePositions: true,
    };
    return super.findOne(id, include);
  }

  // Custom methods
  async findPositionsByEquipment(equipmentId: number) {
    return this.prisma.tirePositionConfig.findMany({
      where: {
        axle: {
          equipmentId: equipmentId,
        },
      },
      include: {
        axle: {
          include: {
            equipment: true,
          },
        },
      },
      orderBy: [{ axle: { order: "asc" } }, { positionKey: "asc" }],
    });
  }

  async createWithPositions(dto: CreateEquipmentAxleWithPositionsDto) {
    const result = await this.prisma.$transaction(async (tx) => {
      // Create the axle
      const axle = await tx.equipmentAxle.create({
        data: dto.axle,
      });

      // Create all positions for this axle
      const positions = await Promise.all(
        dto.positions.map((position) =>
          tx.tirePositionConfig.create({
            data: {
              ...position,
              axleId: axle.id,
            },
          })
        )
      );

      // Return axle with positions
      return tx.equipmentAxle.findUnique({
        where: { id: axle.id },
        include: {
          tirePositions: true,
          equipment: true,
        },
      });
    });
    return { data: result };
  }
}

