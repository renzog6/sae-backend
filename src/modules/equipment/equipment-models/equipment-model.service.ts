// filepath: sae-backend/src/modules/equipment/services/equipment-model.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { CreateEquipmentModelDto } from "./dto/create-equipment-model.dto";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";

@Injectable()
export class EquipmentModelService extends BaseService<any> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.equipmentModel;
  }

  protected buildSearchConditions(q: string) {
    return [{ name: { contains: q } }, { description: { contains: q } }];
  }

  async create(createEquipmentModelDto: CreateEquipmentModelDto) {
    const model = await this.prisma.equipmentModel.create({
      data: createEquipmentModelDto,
      include: {
        brand: true,
        type: true,
      },
    });
    return { data: model };
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const { skip, take, q, sortBy = "name", sortOrder = "asc" } = query;

    // Build search filter
    const where: any = {};
    if (q) {
      where.OR = [{ name: { contains: q } }, { description: { contains: q } }];
    }

    // Execute query with transaction
    const [data, total] = await this.prisma.$transaction([
      this.prisma.equipmentModel.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
        include: {
          brand: true,
          type: true,
        },
      }),
      this.prisma.equipmentModel.count({ where }),
    ]);

    return new BaseResponseDto(data, total, query.page || 1, query.limit || 10);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.equipmentModel.delete({ where: { id } });
    return { message: "Equipment model deleted successfully" };
  }

  async findByType(typeId: number) {
    return this.prisma.equipmentModel.findMany({
      where: { typeId },
      include: {
        brand: true,
        type: true,
      },
    });
  }
}
