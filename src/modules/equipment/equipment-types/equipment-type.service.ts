import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { CreateEquipmentTypeDto } from "./dto/create-equipment-type.dto";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";
import { EquipmentType } from "./entity/equipment-type.entity";

@Injectable()
export class EquipmentTypeService extends BaseService<EquipmentType> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.equipmentType;
  }

  protected buildSearchConditions(q: string) {
    return [{ name: { contains: q } }, { description: { contains: q } }];
  }

  async create(createEquipmentTypeDto: CreateEquipmentTypeDto) {
    const type = await this.prisma.equipmentType.create({
      data: createEquipmentTypeDto,
      include: { category: true },
    });
    return { data: type };
  }

  protected override getDefaultOrderBy() {
    return { name: "asc" };
  }

  override async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    // Include category relation
    return super.findAll(query, {}, { category: true });
  }

  async findByCategory(categoryId: number) {
    return this.prisma.equipmentType.findMany({
      where: { categoryId },
      include: { category: true },
    });
  }
}

