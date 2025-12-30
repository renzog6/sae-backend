import { Injectable } from "@nestjs/common";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { CreateEquipmentCategoryDto } from "./dto/create-equipment-category.dto";
import { BaseQueryDto, BaseResponseDto } from "@common/dto";
import { EquipmentCategory } from "./entity/equipment-category.entity";

@Injectable()
export class EquipmentCategoryService extends BaseService<EquipmentCategory> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.equipmentCategory;
  }

  protected buildSearchConditions(q: string) {
    return [{ name: { contains: q } }, { description: { contains: q } }];
  }

  async create(createEquipmentCategoryDto: CreateEquipmentCategoryDto) {
    const category = await this.prisma.equipmentCategory.create({
      data: createEquipmentCategoryDto,
      include: { types: true },
    });
    return { data: category };
  }

  protected override getDefaultOrderBy() {
    return { name: "asc" };
  }

  override async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const include = { types: true };
    return super.findAll(query, {}, include);
  }
}

