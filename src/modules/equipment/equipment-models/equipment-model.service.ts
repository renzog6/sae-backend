// filepath: sae-backend/src/modules/equipment/equipment-models/equipment-model.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";
import { CreateEquipmentModelDto } from "./dto/create-equipment-model.dto";
import { EquipmentModel } from "./entity/equipment-model.entity";

@Injectable()
export class EquipmentModelService extends BaseService<EquipmentModel> {
  constructor(protected prisma: PrismaService) {
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

  override async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    query.sortBy = query.sortBy ?? "name";
    query.sortOrder = query.sortOrder ?? "asc";

    return super.findAll(query, {}, { brand: true, type: true });
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
