// filepath: sae-backend/src/modules/persons/family/family.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateFamilyDto } from "@modules/persons/dto/create-family.dto";
import { UpdateFamilyDto } from "@modules/persons/dto/update-family.dto";
import { PrismaService } from "@prisma/prisma.service";
import { BaseService } from "@common/services/base.service";
import { BaseQueryDto, BaseResponseDto } from "@common/dto/base-query.dto";

@Injectable()
export class FamilyService extends BaseService<any> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.family;
  }

  protected buildSearchConditions(q: string): any[] {
    return [
      { relationship: { contains: q, mode: "insensitive" } },
      { person: { firstName: { contains: q, mode: "insensitive" } } },
      { person: { lastName: { contains: q, mode: "insensitive" } } },
      { relative: { firstName: { contains: q, mode: "insensitive" } } },
      { relative: { lastName: { contains: q, mode: "insensitive" } } },
    ];
  }

  async create(dto: CreateFamilyDto) {
    const family = await this.prisma.family.create({
      data: {
        relationship: dto.relationship,
        person: { connect: { id: dto.personId } },
        relative: { connect: { id: dto.relativeId } },
      },
      include: { person: true, relative: true },
    });
    return { data: family };
  }

  async findAll(
    query: BaseQueryDto = new BaseQueryDto()
  ): Promise<BaseResponseDto<any>> {
    const include = { person: true, relative: true };
    return super.findAll(query, {}, include);
  }

  async findOne(id: number) {
    const include = { person: true, relative: true };
    return super.findOne(id, include);
  }

  async update(id: number, dto: UpdateFamilyDto) {
    await this.findOne(id);
    const updateData: any = {};

    if (typeof dto.relationship !== "undefined") {
      updateData.relationship = dto.relationship;
    }

    // Handle optional personId update
    if (typeof (dto as any).personId !== "undefined") {
      updateData.person = { connect: { id: (dto as any).personId } };
    }

    // Handle optional relativeId update
    if (typeof (dto as any).relativeId !== "undefined") {
      updateData.relative = { connect: { id: (dto as any).relativeId } };
    }

    const family = await this.prisma.family.update({
      where: { id },
      data: updateData,
      include: { person: true, relative: true },
    });
    return { data: family };
  }

  async remove(id: number) {
    // Since Family model doesn't have soft delete, do hard delete
    await this.findOne(id);
    await this.prisma.family.delete({ where: { id } });
    return { message: "Family relationship deleted successfully" };
  }
}
